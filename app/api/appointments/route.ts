import { addMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import AppointmentConfirmationEmail from "@/emails/AppointmentConfirmationEmail";
import { auth } from "@/lib/auth";
import { getAvailableSlots } from "@/lib/availability";
import { prisma } from "@/lib/db";
import { EMAIL_FROM, getResend } from "@/lib/email";
import { generateICS } from "@/lib/ics";

const createSchema = z.object({
  creditId: z.string(),
  startsAt: z.string().datetime(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = req.nextUrl;
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const where: Record<string, unknown> = {};
  if (start) where.startsAt = { ...(where.startsAt as object ?? {}), gte: new Date(start) };
  if (end) where.endsAt = { lte: new Date(end) };

  const appointments = await prisma.appointment.findMany({
    where,
    include: { user: { select: { id: true, name: true, email: true } }, service: true },
    orderBy: { startsAt: "asc" },
  });

  return NextResponse.json({ appointments });
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { creditId, startsAt } = parsed.data;
    const startsAtDate = new Date(startsAt);

    const credit = await prisma.serviceCredit.findFirst({
      where: { id: creditId, userId: session.user.id, redeemed: false },
      include: { service: true },
    });

    if (!credit) {
      return NextResponse.json({ error: "Crédito no válido o ya canjeado." }, { status: 404 });
    }

    const timeStr = `${String(startsAtDate.getHours()).padStart(2, "0")}:${String(startsAtDate.getMinutes()).padStart(2, "0")}`;
    const availableSlots = await getAvailableSlots(startsAtDate, credit.service.durationMin);

    if (!availableSlots.includes(timeStr)) {
      return NextResponse.json(
        { error: "Ese horario ya no está disponible. Elige otro." },
        { status: 409 }
      );
    }

    const endsAt = addMinutes(startsAtDate, credit.service.durationMin);

    const [appointment] = await prisma.$transaction([
      prisma.appointment.create({
        data: {
          userId: session.user.id,
          serviceId: credit.serviceId,
          creditId: credit.id,
          startsAt: startsAtDate,
          endsAt,
          status: "CONFIRMED",
        },
      }),
      prisma.serviceCredit.update({
        where: { id: creditId },
        data: { redeemed: true },
      }),
    ]);

    if (process.env.RESEND_API_KEY && session.user.email) {
      try {
        const ics = generateICS({
          uid: appointment.id,
          title: `Forma y Línea — ${credit.service.name}`,
          description: `Cita de ${credit.service.name}. Pasaje Dulcinea del Toboso 3, Ciudad Real.`,
          location: "Pasaje Dulcinea del Toboso 3, 13001 Ciudad Real",
          startsAt: startsAtDate,
          endsAt,
        });
        await getResend().emails.send({
          from: EMAIL_FROM,
          to: session.user.email,
          subject: `Tu cita de ${credit.service.name} está confirmada`,
          react: AppointmentConfirmationEmail({
            name: session.user.name ?? "",
            serviceName: credit.service.name,
            startsAt: startsAtDate,
            endsAt,
            durationMin: credit.service.durationMin,
          }),
          attachments: [
            {
              filename: "cita-forma-y-linea.ics",
              content: Buffer.from(ics).toString("base64"),
              contentType: "text/calendar; charset=utf-8",
            },
          ],
        });
      } catch (e) {
        console.error("Appointment email failed:", e);
      }
    }

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
