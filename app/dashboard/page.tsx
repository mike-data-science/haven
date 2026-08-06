import prisma from "@/lib/db";
import DashboardPage from "@/components/admin/DashboardPage";

export default async function AdminContentPage() {
  const totalListings = await prisma.property.count({
    where: { status: 'APPROVED', isDeleted: false }
  });
  
  const activeAgents = await prisma.user.count({
    where: { role: "AGENT" }
  });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentProps = await prisma.property.findMany({
    where: { createdAt: { gte: sevenDaysAgo }, status: 'APPROVED', isDeleted: false },
    select: { createdAt: true }
  });
  
  const thisWeek = recentProps.length;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const chartData: { name: string; value: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    chartData.push({ name: daysOfWeek[d.getDay()], value: 0 });
  }

  recentProps.forEach(p => {
    const dayName = daysOfWeek[new Date(p.createdAt).getDay()];
    const entry = chartData.find(c => c.name === dayName);
    if (entry) entry.value++;
  });

  // Top Agents
  const agentsWithCounts = await prisma.user.findMany({
    where: { role: "AGENT" },
    include: {
      _count: {
        select: { properties: { where: { status: 'APPROVED', isDeleted: false } } }
      }
    },
    orderBy: {
      properties: {
        _count: "desc"
      }
    },
    take: 3
  });

  const topAgents = agentsWithCounts.map(a => ({
    id: a.id,
    name: a.name,
    image: a.avatarUrl || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    listings: a._count.properties
  }));

  // Type Counts (by Category)
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { properties: { where: { status: 'APPROVED', isDeleted: false } } }
      }
    }
  });
  
  const typeCounts = categories.map(c => ({
    type: c.name,
    count: c._count.properties
  })).sort((a, b) => b.count - a.count);

  // Recent Listings
  const rawRecentListings = await prisma.property.findMany({
    where: { status: 'APPROVED', isDeleted: false },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      user: true,
      images: true,
      category: true,
    }
  });

  const recentListings = rawRecentListings.map(p => ({
    id: p.id,
    title: p.title,
    address: p.address,
    location: p.city,
    price: p.price,
    beds: p.rooms,
    baths: p.bathrooms,
    sqft: p.area,
    type: p.category?.name || "Other",
    image: p.images[0]?.url || "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800&auto=format&fit=crop",
    gallery: p.images?.length > 0 ? p.images.map(i => i.url) : ["https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800&auto=format&fit=crop"],
    status: p.status,
    latitude: p.latitude,
    longitude: p.longitude,
    agent: {
      name: p.user.name,
      image: p.user.avatarUrl || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
    },
    // Use the saved pinLeft/pinTop if available, otherwise random
    pin: {
      top: p.pinTop || `${Math.floor(Math.random() * 80 + 10)}%`,
      left: p.pinLeft || `${Math.floor(Math.random() * 80 + 10)}%`,
    }
  }));

  const stats = {
    totalListings,
    activeAgents,
    thisWeek,
    avgDaysOnMarket: 14 // Placeholder
  };

  return (
    <DashboardPage 
      recentListings={recentListings}
      stats={stats}
      topAgents={topAgents}
      typeCounts={typeCounts}
      weeklyActivityData={chartData}
    />
  );
}
