import AdminSidebar from "@/components/admin/AdminSidebar";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db";

export default async function SidebarPage() {
  const user = await getCurrentUser();
  let pendingCount = 0;
  if (user.role === 'ADMIN' || user.role === 'MODERATOR') {
    pendingCount = await prisma.property.count({
      where: { status: 'PENDING', isDeleted: false }
    });
  }
  return <AdminSidebar user={user} pendingCount={pendingCount} />;
}