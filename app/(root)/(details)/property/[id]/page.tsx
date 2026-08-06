import PropertyDetailPage from '@/components/front/PropertyDetailPage';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getCurrentUser } from '@/lib/auth/session';

export const revalidate = 300; // 5 minutes

const getPropertyById = cache(async (id: number) => {
  return prisma.property.findFirst({
    where: { id, isDeleted: false },
    include: { user: true, images: true, category: true },
  });
});

const getSimilarProperties = cache(async (city: string) => {
  return prisma.property.findMany({
    where: { city, status: 'APPROVED', isDeleted: false },
    include: { user: true, images: true, category: true },
    take: 5,
  });
});

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const rawProperty = await getPropertyById(parseInt(id, 10));

  if (!rawProperty) {
    notFound();
  }

  // If the property is not approved, only the owner or an admin can view it
  if (rawProperty.status !== 'APPROVED') {
    let user = null;
    try {
      user = await getCurrentUser();
    } catch (error) {
      // Ignore unauthorized error, user is null
    }

    if (!user || (user.role !== 'ADMIN' && user.id !== rawProperty.userId)) {
      notFound();
    }
  }

  let descriptionText = rawProperty.description || "";
  let metaTag = rawProperty.status === 'APPROVED' ? "For Sale" : "Off Market";
  let customFeatures = null;

  const metaMatch = descriptionText.match(/<!--HAVEN_META:(.*?)-->/);
  if (metaMatch && metaMatch[1]) {
    try {
      const parsedMeta = JSON.parse(metaMatch[1]);
      if (parsedMeta.tag) metaTag = parsedMeta.tag;
      if (parsedMeta.features) customFeatures = parsedMeta.features;
    } catch (e) {}
    descriptionText = descriptionText.replace(/<!--HAVEN_META:.*?-->/, "").trim();
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
    tag: metaTag,
    description: descriptionText,
    customFeatures,
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

  const similarRaw = await getSimilarProperties(rawProperty.city);

  const similarProperties = similarRaw
    .filter(p => p.id !== rawProperty.id)
    .slice(0, 4) // Ensure we only get up to 4
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
