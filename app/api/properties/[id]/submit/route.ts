import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await props.params;
    const propertyId = parseInt(params.id);

    if (isNaN(propertyId)) {
      return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
    }

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.userId !== user.id && user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const updated = await prisma.property.update({
      where: { id: propertyId },
      data: {
        status: 'PENDING',
        submittedAt: new Date(),
      },
    });

    // Record history
    await prisma.propertyModerationHistory.create({
      data: {
        propertyId,
        oldStatus: property.status,
        newStatus: 'PENDING',
        changedById: user.id,
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit property for review" }, { status: 500 });
  }
}
