import prisma from "@/lib/db";
import { PropertyCard } from "@/components/front/PropertyCard";

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
    }
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold font-serif mb-2">Discover Properties</h1>
      <p className="text-slate-500 mb-8">Browse all available listings on the market.</p>
      
      {formattedProperties.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500">No properties available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {formattedProperties.map((listing: any) => (
            <PropertyCard key={listing.id} listing={listing} compact={false} selected={false} onSelect={undefined} />
          ))}
        </div>
      )}
    </div>
  );
}
