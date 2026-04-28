"use client";

import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { BOOKING } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  creditId: string;
  serviceId: string;
  durationMin: number;
}

export function BookingCalendar({ creditId, serviceId, durationMin }: BookingCalendarProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [weekStart, setWeekStart] = useState(() => startOfDay(addDays(new Date(), 1)));

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const today = startOfDay(new Date());
  const maxDate = addDays(today, BOOKING.maxAdvanceDays);

  useEffect(() => {
    if (!selectedDate) return;
    setSelectedTime(null);
    setLoadingSlots(true);
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    fetch(`/api/appointments/availability?date=${dateStr}&serviceId=${serviceId}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => toast.error("Error al cargar horarios"))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, serviceId]);

  async function handleConfirm() {
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    try {
      const [h, m] = selectedTime.split(":").map(Number);
      const startsAt = new Date(selectedDate);
      startsAt.setHours(h, m, 0, 0);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creditId, startsAt: startsAt.toISOString() }),
      });

      if (res.ok) {
        toast.success("¡Cita reservada con éxito!");
        router.push("/mi-cuenta/citas");
      } else {
        const data = await res.json();
        toast.error(data.error ?? "No se pudo reservar la cita.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] overflow-hidden">
      {/* Selector de semana */}
      <div className="p-4 border-b border-[var(--line)]">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setWeekStart((d) => addDays(d, -7))}
            disabled={weekStart <= addDays(today, 1)}
            aria-label="Semana anterior"
            className="p-2 rounded-full hover:bg-[var(--bg-deep)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-target flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-[var(--text-base)] capitalize">
            {format(weekStart, "MMMM yyyy", { locale: es })}
          </span>
          <button
            onClick={() => setWeekStart((d) => addDays(d, 7))}
            disabled={weekStart >= addDays(maxDate, -7)}
            aria-label="Semana siguiente"
            className="p-2 rounded-full hover:bg-[var(--bg-deep)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-target flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Días */}
        <div className="grid grid-cols-7 gap-1">
          {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
            <div key={d} className="text-center text-xs text-[var(--text-mute)] pb-2">
              {d}
            </div>
          ))}
          {days.map((day) => {
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isPast = day < addDays(today, 1);
            const isTooFar = day > maxDate;
            const isSunday = day.getDay() === 0;
            const disabled = isPast || isTooFar || isSunday;

            return (
              <button
                key={day.toISOString()}
                onClick={() => !disabled && setSelectedDate(day)}
                disabled={disabled}
                aria-label={format(day, "d MMMM yyyy", { locale: es })}
                aria-pressed={isSelected}
                className={cn(
                  "h-10 w-full rounded-lg text-sm font-medium transition-all touch-target flex items-center justify-center",
                  isSelected
                    ? "bg-[var(--gold-500)] text-white"
                    : disabled
                    ? "text-[var(--text-mute)] cursor-not-allowed"
                    : "hover:bg-[var(--bg-cream)] text-[var(--text-base)] cursor-pointer"
                )}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slots de hora */}
      {selectedDate && (
        <div className="p-4">
          <p className="text-sm font-medium text-[var(--text-base)] mb-3">
            Elige hora — {format(selectedDate, "EEEE d MMMM", { locale: es })}
          </p>
          {loadingSlots ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--gold-500)]" />
            </div>
          ) : slots.length === 0 ? (
            <p className="text-sm text-[var(--text-mute)] text-center py-6">
              No hay huecos disponibles este día. Prueba con otro.
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  aria-pressed={selectedTime === time}
                  className={cn(
                    "py-2.5 rounded-lg text-sm font-medium border transition-all touch-target",
                    selectedTime === time
                      ? "bg-[var(--gold-500)] text-white border-[var(--gold-500)]"
                      : "border-[var(--line)] text-[var(--text-base)] hover:border-[var(--gold-500)] hover:text-[var(--gold-700)]"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Confirmar */}
      {selectedDate && selectedTime && (
        <div className="p-4 border-t border-[var(--line)] bg-[var(--bg-cream)]">
          <p className="text-sm text-[var(--text-soft)] mb-3">
            <strong className="text-[var(--text-base)]">
              {format(selectedDate, "EEEE d MMMM", { locale: es })} a las {selectedTime}
            </strong>{" "}
            — {durationMin} minutos
          </p>
          <Button onClick={handleConfirm} disabled={submitting} className="w-full sm:w-auto">
            {submitting ? "Confirmando..." : "Confirmar cita"}
          </Button>
        </div>
      )}
    </div>
  );
}
