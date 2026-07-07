import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { requireRole } from "@/lib/auth/roles";
import { notFound } from "next/navigation";
import { adminEntities } from "@/lib/admin";
import prisma from "@/lib/db";

interface AdminEntityRouteProps {
  params: Promise<{
    table: string;
  }>;
}

export default async function AdminEntityRoute({ params }: AdminEntityRouteProps) {
  const p = await params;
  
  // Protect this route - ADMIN can access anything, non-admins only 'properties'
  const allowedRoles = p.table === 'properties' ? ['ADMIN', 'AGENT', 'USER'] : ['ADMIN'];
  const user = await requireRole(allowedRoles as any);
  
  // Validate that the table actually exists
  const entity = adminEntities.find(e => e.slug === p.table);
  if (!entity) {
    notFound();
  }

  // Fetch categories for the properties form
  const categories = await prisma.category.findMany({ select: { id: true, name: true } });

  return <AdminEntityPage table={p.table} categories={categories} currentUser={{ id: user.id, role: user.role }} />;
}
