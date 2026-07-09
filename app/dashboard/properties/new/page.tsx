import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth/roles";
import ModernPropertyForm from "@/components/admin/ModernPropertyForm";

export default async function NewPropertyPage() {
  await requireRole(['ADMIN', 'AGENT', 'USER'] as any);
  
  const categories = await prisma.category.findMany({ select: { id: true, name: true } });

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <ModernPropertyForm categories={categories} />
    </div>
  );
}
