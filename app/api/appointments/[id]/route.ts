import { addMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const patchSchema = z.object({
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"]).optional(),
  adminNotes: z.string().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id } = await params;
  const { startsAt, status, adminNotes } = parsed.data;
  let updateData: Record<string, unknown> = {};

  if (startsAt) {
    const appt = await prisma.appointment.findUnique({ where: { id }, include: { service: true } });
    if (!appt) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const start = new Date(startsAt);
    updateData.startsAt = start;
    updateData.endsAt = addMinutes(start, appt.service.durationMin);
  }
  if (status) updateData.status = status;
  if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

  const updated = await prisma.appointment.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({ appointment: updated });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { user: true, service: true },
  });

  if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ appointment });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Free the credit (if linked) so the customer can rebook
  await prisma.$transaction([
    prisma.appointment.delete({ where: { id } }),
    ...(appointment.creditId
      ? [
          prisma.serviceCredit.update({
            where: { id: appointment.creditId },
            data: { redeemed: false },
          }),
        ]
      : []),
  ]);

  return NextResponse.json({ ok: true });
}
