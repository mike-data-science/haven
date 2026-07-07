import HomePage from '@/components/front/HomePage';
import prisma from '@/lib/db';

export const revalidate = 0; // Ensures fresh data is fetched

async function getHomeData() {
  const rawProperties = await prisma.property.findMany({
    include: { user: true, images: true, category: true },
    orderBy: { id: 'desc' },
    take: 6,
  });

  const rawAgents = await prisma.user.findMany({
    where: { role: 'AGENT' },
    take: 3,
  });

  const properties = rawProperties.map(p => ({
    id: p.id,
    title: p.title,
    location: `${p.address}, ${p.city}`,
    price: Number(p.price),
    beds: p.rooms,
    baths: p.bathrooms,
    sqft: p.area,
    yearBuilt: p.yearBuilt,
    type: p.category?.name || "House",
    tag: p.isPublished ? "For Sale" : "Off Market",
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

  const agents = rawAgents.map(a => ({
    id: a.id,
    name: a.name,
    role: a.title || "Agent",
    deals: 0,
    listings: 0,
    image: a.avatarUrl || "https://placehold.co/100x100?text=Agent"
  }));

  return { properties, agents };
}

export default async function Page() {
  const { properties, agents } = await getHomeData();
  return <HomePage properties={properties} agents={agents} />;
}