import AdminSidebar from "@/components/admin/AdminSidebar";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db";

export default async function SidebarPage() {
  const user = await getCurrentUser();
  
  // Optional: fetch pendingCount for properties that need approval
  const pendingCount = await prisma.property.count({
    where: { status: "PENDING" },
  });

  return <AdminSidebar user={user as any} pendingCount={pendingCount} />;
}