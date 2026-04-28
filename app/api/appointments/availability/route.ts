import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { getAvailableSlots } from "@/lib/availability";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const dateStr = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");

    if (!dateStr || !serviceId) {
      return NextResponse.json({ error: "date and serviceId required" }, { status: 400 });
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const slots = await getAvailableSlots(date, service.durationMin);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
