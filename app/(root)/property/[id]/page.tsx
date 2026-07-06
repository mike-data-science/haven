import PropertyDetailPage from '@/components/front/PropertyDetailPage';
import { initializeDB } from '@/lib/db';
import { Property } from '@/entities/Property';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const db = await initializeDB();
  const propertyRepo = db.getRepository(Property);

  const rawProperty = await propertyRepo.findOne({
    where: { id: parseInt(id, 10) },
    relations: ['user', 'images', 'category'],
  });

  if (!rawProperty) {
    notFound();
  }

  const property = {
    id: rawProperty.id,
    title: rawProperty.title,
    location: `${rawProperty.address}, ${rawProperty.city}`,
    price: Number(rawProperty.price),
    beds: rawProperty.rooms,
    baths: rawProperty.bathrooms,
    sqft: rawProperty.area,
    yearBuilt: rawProperty.yearBuilt,
    type: rawProperty.category?.name || "House",
    tag: rawProperty.isPublished ? "For Sale" : "Off Market",
    description: rawProperty.description,
    image: rawProperty.images?.[0]?.url || "",
    gallery: rawProperty.images?.map(i => i.url) || [],
    agent: rawProperty.user ? {
      name: rawProperty.user.name,
      role: rawProperty.user.title || "Agent",
      phone: rawProperty.user.phone || "",
      email: rawProperty.user.email || "",
      image: rawProperty.user.avatarUrl || ""
    } : null,
    pin: { top: rawProperty.pinTop || "50%", left: rawProperty.pinLeft || "50%" },
    latitude: rawProperty.latitude,
    longitude: rawProperty.longitude
  };

  const similarRaw = await propertyRepo.find({
    where: { city: rawProperty.city },
    relations: ['user', 'images', 'category'],
    take: 4,
  });

  const similarProperties = similarRaw
    .filter(p => p.id !== rawProperty.id)
    .map(p => ({
      id: p.id,
      title: p.title,
      location: `${p.address}, ${p.city}`,
      price: Number(p.price),
      beds: p.rooms,
      baths: p.bathrooms,
      sqft: p.area,
      image: p.images?.[0]?.url || "",
    }));

  // @ts-ignore
  return <PropertyDetailPage property={property} similarProperties={similarProperties} />;
}
