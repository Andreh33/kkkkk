import { addMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const createSchema = z.object({
  userId: z.string().optional(),
  guestName: z.string().min(2).optional(),
  guestEmail: z.string().email().optional(),
  guestPhone: z.string().optional(),
  serviceId: z.string(),
  startsAt: z.string().datetime(),
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "NO_SHOW", "CANCELLED"]).default("CONFIRMED"),
  adminNotes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { userId, guestName, guestEmail, guestPhone, serviceId, startsAt, status, adminNotes } =
    parsed.data;

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });

  let finalUserId = userId;

  // Walk-in / cita manual sin cuenta: crear o reutilizar usuario "guest"
  if (!finalUserId) {
    if (!guestName || !guestEmail) {
      return NextResponse.json(
        { error: "Indica un usuario existente o nombre + email del cliente." },
        { status: 400 }
      );
    }
    const existing = await prisma.user.findUnique({ where: { email: guestEmail } });
    if (existing) {
      finalUserId = existing.id;
    } else {
      const created = await prisma.user.create({
        data: {
          name: guestName,
          email: guestEmail,
          phone: guestPhone ?? null,
          role: "USER",
        },
      });
      finalUserId = created.id;
    }
  }

  const start = new Date(startsAt);
  const end = addMinutes(start, service.durationMin);

  const appointment = await prisma.appointment.create({
    data: {
      userId: finalUserId,
      serviceId,
      startsAt: start,
      endsAt: end,
      status,
      adminNotes: adminNotes ?? null,
    },
    include: { user: true, service: true },
  });

  return NextResponse.json({ appointment }, { status: 201 });
}
