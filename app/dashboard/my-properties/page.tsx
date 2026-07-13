import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db";
import MyPropertiesClient from "./MyPropertiesClient";

export default async function MyPropertiesPage() {
  const user = await getCurrentUser();

  const properties = await prisma.property.findMany({
    where: { 
      userId: user.id,
      isDeleted: false 
    },
    include: {
      category: true,
      images: { orderBy: { order: 'asc' } },
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[9px]">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Properties</h1>
          <p className="text-slate-500 mt-[3px].5">Manage your listings and track their verification status.</p>
        </div>
      </div>
      
      <MyPropertiesClient initialProperties={properties as any} />
    </div>
  );
}
