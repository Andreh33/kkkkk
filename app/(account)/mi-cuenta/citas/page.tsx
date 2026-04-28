export const dynamic = "force-dynamic";

import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";

const STATUS_LABELS: Record<string, { label: string; variant: "sage" | "warning" | "destructive" | "success" | "secondary" }> = {
  PENDING: { label: "Pendiente", variant: "warning" },
  CONFIRMED: { label: "Confirmada", variant: "sage" },
  COMPLETED: { label: "Completada", variant: "success" },
  CANCELLED: { label: "Cancelada", variant: "destructive" },
  NO_SHOW: { label: "No presentado", variant: "secondary" },
};

async function getData(userId: string) {
  const [appointments, credits] = await Promise.all([
    prisma.appointment.findMany({
      where: { userId },
      include: { service: true },
      orderBy: { startsAt: "desc" },
    }),
    prisma.serviceCredit.findMany({
      where: { userId, redeemed: false },
      include: { service: true },
    }),
  ]);
  return { appointments, credits };
}

export default async function CitasPage() {
  const session = await auth();
  const { appointments, credits } = await getData(session!.user.id);
  const now = new Date();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl text-[var(--text-strong)]">Mis citas</h1>

      {/* Créditos sin canjear */}
      {credits.length > 0 && (
        <div className="bg-[var(--sage-50)] rounded-xl border border-[var(--sage-100)] p-5">
          <h2 className="font-medium text-[var(--sage-700)] mb-4">
            Citas por reservar ({credits.length})
          </h2>
          <div className="space-y-3">
            {credits.map((credit) => (
              <div key={credit.id} className="flex items-center justify-between bg-white rounded-lg p-4 border border-[var(--sage-100)]">
                <div>
                  <p className="font-medium text-[var(--text-base)]">{credit.service.name}</p>
                  <p className="text-sm text-[var(--text-soft)]">{credit.service.durationMin} min</p>
                </div>
                <Button asChild size="sm">
                  <Link href={`/mi-cuenta/citas/reservar/${credit.id}`}>Reservar</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historial */}
      <div>
        <h2 className="font-medium text-[var(--text-base)] mb-4">Historial de citas</h2>
        {appointments.length === 0 ? (
          <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-8 text-center">
            <Calendar className="h-10 w-10 text-[var(--text-mute)] mx-auto mb-3" />
            <p className="text-[var(--text-soft)]">Aún no tienes citas.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => {
              const status = STATUS_LABELS[appt.status] ?? { label: appt.status, variant: "secondary" as const };
              const canCancel =
                appt.status !== "CANCELLED" &&
                appt.status !== "COMPLETED" &&
                new Date(appt.startsAt).getTime() - now.getTime() > 24 * 60 * 60 * 1000;

              return (
                <div key={appt.id} className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-[var(--text-base)]">{appt.service.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-[var(--text-soft)]">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{formatDateTime(appt.startsAt)}</span>
                    </div>
                    <Badge variant={status.variant} className="mt-2">{status.label}</Badge>
                  </div>
                  {canCancel && (
                    <Button variant="ghost" size="sm" className="text-[var(--danger)] hover:text-[var(--danger)] hover:bg-red-50 flex-shrink-0">
                      Cancelar
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
