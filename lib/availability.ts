import { addMinutes, format, isAfter, isBefore, parseISO, setHours, setMinutes, startOfDay } from "date-fns";

import { prisma } from "@/lib/db";
import { BOOKING, SCHEDULE } from "@/lib/constants";

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function slotStart(date: Date, timeStr: string): Date {
  const [h, m] = timeStr.split(":").map(Number);
  const d = startOfDay(date);
  return setMinutes(setHours(d, h), m);
}

export async function getAvailableSlots(
  date: Date,
  durationMin: number
): Promise<string[]> {
  const dayOfWeek = date.getDay();
  const schedule = SCHEDULE[dayOfWeek];
  if (!schedule) return [];

  const openMin = timeToMinutes(schedule.open);
  const closeMin = timeToMinutes(schedule.close);
  const now = new Date();
  const minAdvance = addMinutes(now, BOOKING.minAdvanceHours * 60);
  const maxAdvance = addMinutes(now, BOOKING.maxAdvanceDays * 24 * 60);

  if (isAfter(startOfDay(date), maxAdvance)) return [];

  // Obtener citas del día para bloquear slots
  const dayStart = startOfDay(date);
  const dayEnd = addMinutes(dayStart, 24 * 60);

  const booked = await prisma.appointment.findMany({
    where: {
      startsAt: { gte: dayStart, lt: dayEnd },
      status: { notIn: ["CANCELLED"] },
    },
    select: { startsAt: true, endsAt: true },
  });

  const slots: string[] = [];

  for (
    let min = openMin;
    min + durationMin + BOOKING.bufferMinutes <= closeMin;
    min += BOOKING.slotIntervalMinutes
  ) {
    const slotStartTime = slotStart(date, minutesToTime(min));
    const slotEndTime = addMinutes(slotStartTime, durationMin + BOOKING.bufferMinutes);

    // Antelación mínima
    if (isBefore(slotStartTime, minAdvance)) continue;

    // Comprobar colisión con citas existentes
    const hasConflict = booked.some((appt) => {
      const apptStart = new Date(appt.startsAt);
      const apptEnd = addMinutes(new Date(appt.endsAt), BOOKING.bufferMinutes);
      return isBefore(slotStartTime, apptEnd) && isAfter(slotEndTime, apptStart);
    });

    if (!hasConflict) {
      slots.push(format(slotStartTime, "HH:mm"));
    }
  }

  return slots;
}
