import prisma from "@/lib/db";
import DiscoverClient from "@/components/dashboard/DiscoverClient";

export default async function DiscoverPage() {
  const properties = await prisma.property.findMany({
    where: { status: 'APPROVED', isDeleted: false },
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      images: true,
      category: true,
    }
  });

  const formattedProperties = properties.map((p: any) => ({
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
    gallery: p.images?.length > 0 ? p.images.map((i: any) => i.url) : ["https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800&auto=format&fit=crop"],
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

  return <DiscoverClient listings={formattedProperties} />;
}
