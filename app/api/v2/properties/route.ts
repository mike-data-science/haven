import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: "APPROVED",
        isDeleted: false,
        latitude: { not: null },
        longitude: { not: null },
      },
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
        category: { select: { name: true } },
        user: { select: { name: true, avatarUrl: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    // Compute stats
    const totalApproved = await prisma.property.count({
      where: { status: "APPROVED", isDeleted: false },
    });

    const totalPending = await prisma.property.count({
      where: { status: "PENDING", isDeleted: false },
    });

    const prices = properties.map((p) => p.price);
    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;

    const areas = properties.filter((p) => p.area > 0).map((p) => p.area);
    const avgPricePerSqm =
      areas.length > 0
        ? properties
            .filter((p) => p.area > 0)
            .reduce((sum, p) => sum + p.price / p.area, 0) / areas.length
        : 0;

    // Weekly trend (last 7 days)
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyTrend: { name: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      weeklyTrend.push({ name: daysOfWeek[d.getDay()], value: 0 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentProps = await prisma.property.findMany({
      where: { createdAt: { gte: sevenDaysAgo }, status: "APPROVED", isDeleted: false },
      select: { createdAt: true },
    });
    recentProps.forEach((p) => {
      const dayName = daysOfWeek[new Date(p.createdAt).getDay()];
      const entry = weeklyTrend.find((c) => c.name === dayName);
      if (entry) entry.value++;
    });

    const soldPercent = totalApproved + totalPending > 0
      ? Math.round((totalApproved / (totalApproved + totalPending)) * 100)
      : 0;

    return NextResponse.json({
      properties: properties.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        city: p.city,
        address: p.address,
        rooms: p.rooms,
        bathrooms: p.bathrooms,
        area: p.area,
        floor: p.floor,
        yearBuilt: p.yearBuilt,
        latitude: p.latitude,
        longitude: p.longitude,
        categoryName: p.category?.name || "Property",
        agentName: p.user?.name || "Unknown",
        agentAvatar: p.user?.avatarUrl || null,
        imageUrl: p.images[0]?.url || null,
        createdAt: p.createdAt,
      })),
      stats: {
        totalApproved,
        totalPending,
        soldPercent,
        pendingPercent: 100 - soldPercent,
        avgPrice: Math.round(avgPrice),
        avgPricePerSqm: Math.round(avgPricePerSqm),
        weeklyTrend,
      },
    });
  } catch (error) {
    console.error("V2 API Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
