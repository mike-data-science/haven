import HomePage from '@/components/front/HomePage';
import prisma from '@/lib/db';
import { cache } from 'react';

export const revalidate = 300; // 5 minutes

const getHomeData = cache(async () => {
  const rawProperties = await prisma.property.findMany({
    where: { status: 'APPROVED', isDeleted: false },
    include: { user: true, images: true, category: true },
    orderBy: { id: 'desc' },
    take: 8,
  });

  const rawAgents = await prisma.user.findMany({
    where: { role: 'AGENT' },
    take: 4,
  });

  const properties = rawProperties.map(p => ({
    id: p.id,
    title: p.title,
    location: `${p.address}, ${p.city}`,
    address: p.address,
    city: p.city,
    price: Number(p.price),
    beds: p.rooms,
    baths: p.bathrooms,
    sqft: p.area,
    yearBuilt: p.yearBuilt,
    type: p.category?.name || "House",
    tag: p.status === 'APPROVED' ? "For Sale" : "Off Market",
    description: p.description,
    image: p.images?.[0]?.url || "https://placehold.co/600x400?text=No+Image",
    gallery: p.images?.length ? p.images.map(i => i.url) : ["https://placehold.co/600x400?text=No+Image"],
    agent: p.user ? {
      name: p.user.name,
      role: p.user.title || "Agent",
      phone: p.user.phone || "",
      email: p.user.email || "",
      image: p.user.avatarUrl || "https://placehold.co/100x100?text=Agent"
    } : null,
    pin: { top: p.pinTop || "50%", left: p.pinLeft || "50%" }
  }));

  const agents = rawAgents.map((a, idx) => ({
    id: a.id,
    name: a.name,
    role: a.title || "Agent",
    deals: 80 + idx * 24,
    listings: 8 + idx * 3,
    image: a.avatarUrl || "/agents/agent1.png"
  }));

  return { properties, agents };
});

export default async function Page() {
  const { properties, agents } = await getHomeData();
  return <HomePage properties={properties} agents={agents} />;
}