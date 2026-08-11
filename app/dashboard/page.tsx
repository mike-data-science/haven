import prisma from "@/lib/db";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function DashboardMainPage() {
  let user;
  try {
    user = await getCurrentUser();
  } catch (error) {
    redirect("/sign-in");
  }

  // 1. Fetch all approved properties for market stats
  const properties = await prisma.property.findMany({
    where: { status: 'APPROVED', isDeleted: false },
    include: { category: true }
  });

  const totalProperties = properties.length;
  
  let totalPrice = 0;
  let totalArea = 0;
  let minPricePerSqm = Infinity;
  
  const cityStats: Record<string, { total: number; count: number }> = {};
  const categoryStats: Record<string, number> = {};

  properties.forEach(p => {
    totalPrice += p.price;
    totalArea += p.area;
    
    if (p.area > 0) {
      const pricePerSqm = p.price / p.area;
      if (pricePerSqm < minPricePerSqm) {
        minPricePerSqm = pricePerSqm;
      }
    }

    if (p.city) {
      if (!cityStats[p.city]) cityStats[p.city] = { total: 0, count: 0 };
      cityStats[p.city].total += p.price;
      cityStats[p.city].count += 1;
    }

    const typeName = p.category?.name || "Other";
    categoryStats[typeName] = (categoryStats[typeName] || 0) + 1;
  });

  const avgPrice = totalProperties > 0 ? totalPrice / totalProperties : 0;
  const avgPricePerSqm = totalArea > 0 ? totalPrice / totalArea : 0;
  if (minPricePerSqm === Infinity) minPricePerSqm = 0;

  // 2. Prepare Sector Stats (Mocked Chisinau Sectors since DB only uses 'city')
  const baseAvgPrice = avgPrice > 0 ? avgPrice : 150000;
  const sectors = [
    { name: "Botanica", avgPrice: baseAvgPrice * 0.9, count: Math.floor(totalProperties * 0.25) || 12 },
    { name: "Buiucani", avgPrice: baseAvgPrice * 1.1, count: Math.floor(totalProperties * 0.2) || 8 },
    { name: "Centru", avgPrice: baseAvgPrice * 1.4, count: Math.floor(totalProperties * 0.15) || 15 },
    { name: "Ciocana", avgPrice: baseAvgPrice * 0.85, count: Math.floor(totalProperties * 0.2) || 10 },
    { name: "Rîșcani", avgPrice: baseAvgPrice * 1.05, count: Math.floor(totalProperties * 0.2) || 11 },
  ].sort((a, b) => b.count - a.count);

  // 3. User's Properties
  const rawUserProperties = await prisma.property.findMany({
    where: { userId: user.id, isDeleted: false },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { images: true }
  });
  
  const userProperties = rawUserProperties.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.images[0]?.url || "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800&auto=format&fit=crop",
    views: Math.floor(Math.random() * 500) + 50, // Mock views
    status: p.status
  }));

  // 4. Top Agents
  const rawTopAgents = await prisma.user.findMany({
    where: { role: "AGENT" },
    include: {
      _count: { select: { properties: { where: { status: 'APPROVED', isDeleted: false } } } }
    },
    orderBy: { properties: { _count: "desc" } },
    take: 4
  });

  const topAgents = rawTopAgents.map(a => ({
    id: a.id,
    name: a.name,
    image: a.avatarUrl || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
    listings: a._count.properties,
    rating: (Math.random() * (5 - 4.2) + 4.2).toFixed(1) // Mock rating 4.2 - 5.0
  }));

  const propertyTypes = Object.keys(categoryStats).map(name => ({
    name,
    value: categoryStats[name]
  })).sort((a, b) => b.value - a.value);

  // Mock trend data for the last 6 months
  const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  let basePrice = avgPrice * 0.85; 
  const priceTrends = months.map(month => {
    basePrice += (Math.random() * 50000) - 10000; 
    return { month, price: Math.round(basePrice) };
  });
  if (priceTrends.length > 0) priceTrends[5].price = Math.round(avgPrice);

  const marketStats = {
    totalProperties,
    avgPrice,
    avgPricePerSqm,
    minPricePerSqm
  };

  return (
    <AnalyticsDashboard 
      marketStats={marketStats}
      sectors={sectors}
      propertyTypes={propertyTypes}
      priceTrends={priceTrends}
      userProperties={userProperties}
      topAgents={topAgents}
      userName={user.name}
    />
  );
}
