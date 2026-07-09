import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth/roles";
import { PropertyStatus } from "@prisma/client";

export async function GET(req: Request) {
  try {
    await requireRole(['ADMIN', 'MODERATOR']);
    
    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get('status') || 'PENDING';
    
    // Default to today for APPROVED/REJECTED
    let dateFilter = {};
    if (statusParam === 'APPROVED' || statusParam === 'REJECTED') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (statusParam === 'APPROVED') {
        dateFilter = { approvedAt: { gte: today } };
      } else {
        // Technically there's no rejectedAt, so we use updatedAt
        dateFilter = { updatedAt: { gte: today } };
      }
    }

    const properties = await prisma.property.findMany({
      where: { 
        status: statusParam as PropertyStatus, 
        isDeleted: false,
        ...dateFilter
      },
      include: { 
        user: {
          select: { id: true, name: true, email: true, phone: true, title: true, createdAt: true }
        }, 
        category: true, 
        images: { orderBy: { order: 'asc' } }
      },
      orderBy: { updatedAt: 'desc' },
    });
    
    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unauthorized or failed to fetch properties." }, { status: 401 });
  }
}
