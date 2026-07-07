import prisma from "@/lib/db";
import DashboardPage from "@/components/admin/DashboardPage";

export default async function AdminContentPage() {
  const totalListings = await prisma.property.count();
  
  const activeAgents = await prisma.user.count({
    where: { role: "AGENT" }
  });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thisWeek = await prisma.property.count({
    where: { createdAt: { gte: sevenDaysAgo } }
  });

  // Top Agents
  const agentsWithCounts = await prisma.user.findMany({
    where: { role: "AGENT" },
    include: {
      _count: {
        select: { properties: true }
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
        select: { properties: true }
      }
    }
  });
  
  const typeCounts = categories.map(c => ({
    type: c.name,
    count: c._count.properties
  })).sort((a, b) => b.count - a.count);

  // Recent Listings
  const rawRecentListings = await prisma.property.findMany({
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
    location: p.city,
    price: p.price,
    beds: p.rooms,
    baths: p.bathrooms,
    sqft: p.area,
    type: p.category?.name || "Other",
    image: p.images[0]?.url || "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800&auto=format&fit=crop",
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
    />
  );
}
