import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ notifications: [] }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ notifications: [] });
    }

    // Fetch actual inquiries for the user's properties as notifications
    const inquiries = await prisma.inquiry.findMany({
      where: {
        property: {
          userId: dbUser.id
        }
      },
      include: {
        property: true
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 5
    });

    const notifications = inquiries.map(inq => ({
      id: `inq_${inq.id}`,
      type: "inquiry",
      title: "New viewing request",
      description: `New request from ${inq.name} for ${inq.property.title}`,
      createdAt: inq.createdAt
    }));

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json({ notifications: [] }, { status: 500 });
  }
}
