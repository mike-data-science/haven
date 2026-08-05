import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth/roles";
import ModernPropertyForm from "@/components/admin/ModernPropertyForm";
import { notFound } from "next/navigation";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(['ADMIN', 'AGENT', 'USER'] as any);
  
  const { id } = await params;
  const propertyId = Number(id);
  if (isNaN(propertyId)) {
    notFound();
  }

  const [property, categories] = await Promise.all([
    prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        images: true,
        category: true,
      }
    }),
    prisma.category.findMany({ select: { id: true, name: true } })
  ]);

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto p-[9px] md:p-[18px]">
      <ModernPropertyForm categories={categories} initialData={property} />
    </div>
  );
}
