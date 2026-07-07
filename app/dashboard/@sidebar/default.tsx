import AdminSidebar from "@/components/admin/AdminSidebar";
import { getCurrentUser } from "@/lib/auth/session";

export default async function SidebarPage() {
  const user = await getCurrentUser();
  return <AdminSidebar role={user.role} />;
}