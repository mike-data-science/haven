import { requireRole } from "@/lib/auth/roles";
import prisma from "@/lib/db";
import QueueClient from "./QueueClient";

export default async function VerificationQueuePage() {
  const admin = await requireRole(['ADMIN', 'MODERATOR']);

  // Initially fetch pending properties
  const properties = await prisma.property.findMany({
    where: { status: 'PENDING', isDeleted: false },
    include: {
      user: {
        select: { id: true, name: true, email: true, phone: true, title: true, createdAt: true }
      },
      category: true,
      images: { orderBy: { order: 'asc' } },
    },
    orderBy: { submittedAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Verification Queue</h1>
        <p className="text-slate-500 mt-2">Review and moderate pending property submissions.</p>
      </div>
      
      <QueueClient initialProperties={properties as any} adminId={admin.id} />
    </div>
  );
}
