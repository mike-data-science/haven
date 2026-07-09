import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth/roles";

export async function GET() {
  try {
    await requireRole(['ADMIN', 'MODERATOR']);
    
    const pendingProperties = await prisma.property.findMany({
      where: { status: 'PENDING', isDeleted: false },
      include: { user: true, category: true, images: true },
      orderBy: { submittedAt: 'desc' },
    });
    
    return NextResponse.json(pendingProperties);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized or failed to fetch pending properties." }, { status: 401 });
  }
}
