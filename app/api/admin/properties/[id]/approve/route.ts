import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireRole } from "@/lib/auth/roles";

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const adminUser = await requireRole(['ADMIN', 'MODERATOR']);
    const params = await props.params;
    const propertyId = parseInt(params.id);

    if (isNaN(propertyId)) {
      return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
    }

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const updated = await prisma.property.update({
      where: { id: propertyId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
        publishedAt: property.publishedAt || new Date(), // Keep original published date if already published once
        approvedById: adminUser.id,
        rejectionReason: null,
        adminNotes: null,
      },
    });

    // Record history
    await prisma.propertyModerationHistory.create({
      data: {
        propertyId,
        oldStatus: property.status,
        newStatus: 'APPROVED',
        changedById: adminUser.id,
      }
    });

    // We would typically trigger a notification creation here

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to approve property" }, { status: 500 });
  }
}
