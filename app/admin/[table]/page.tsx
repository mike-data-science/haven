import AdminEntityPage from "@/components/admin/AdminEntityPage";

interface AdminEntityRouteProps {
  params: Promise<{
    table: string;
  }>;
}

export default async function AdminEntityRoute({ params }: AdminEntityRouteProps) {
  const p = await params;
  return <AdminEntityPage table={p.table} />;
}
