export const dynamic = "force-dynamic";

import { Calendar, Package } from "lucide-react";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPrice } from "@/lib/utils";

async function getDashboardData(userId: string) {
  const [nextAppointment, lastOrder, pendingCredits] = await Promise.all([
    prisma.appointment.findFirst({
      where: { userId, startsAt: { gte: new Date() }, status: { notIn: ["CANCELLED"] } },
      include: { service: true },
      orderBy: { startsAt: "asc" },
    }),
    prisma.order.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.serviceCredit.count({ where: { userId, redeemed: false } }),
  ]);
  return { nextAppointment, lastOrder, pendingCredits };
}

export default async function MiCuentaDashboard() {
  const session = await auth();
  const { nextAppointment, lastOrder, pendingCredits } = await getDashboardData(session!.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-[var(--text-strong)]">
          Bienvenida, {session!.user.name.split(" ")[0]}
        </h1>
        <p className="text-body-sm text-[var(--text-soft)] mt-1">
          Tu espacio personal en Forma y Línea
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Próxima cita */}
        <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-5">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-5 w-5 text-[var(--gold-500)]" />
            <h2 className="font-medium text-[var(--text-base)]">Próxima cita</h2>
          </div>
          {nextAppointment ? (
            <>
              <p className="font-display text-lg text-[var(--text-strong)]">
                {nextAppointment.service.name}
              </p>
              <p className="text-sm text-[var(--text-soft)] mt-1">
                {formatDate(nextAppointment.startsAt)}
              </p>
              <Badge variant="sage" className="mt-2">Confirmada</Badge>
            </>
          ) : (
            <>
              <p className="text-sm text-[var(--text-soft)] mb-3">No tienes citas próximas.</p>
              <Button asChild size="sm" variant="outline">
                <Link href="/servicios/masajes">Reservar cita</Link>
              </Button>
            </>
          )}
        </div>

        {/* Último pedido */}
        <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-5">
          <div className="flex items-center gap-3 mb-3">
            <Package className="h-5 w-5 text-[var(--gold-500)]" />
            <h2 className="font-medium text-[var(--text-base)]">Último pedido</h2>
          </div>
          {lastOrder ? (
            <>
              <p className="text-sm text-[var(--text-soft)]">{formatDate(lastOrder.createdAt)}</p>
              <p className="font-semibold text-[var(--text-strong)] mt-1">
                {formatPrice(lastOrder.total)}
              </p>
              <Badge className="mt-2" variant={lastOrder.status === "PAID" ? "success" : "secondary"}>
                {lastOrder.status}
              </Badge>
            </>
          ) : (
            <p className="text-sm text-[var(--text-soft)]">Aún no has realizado ningún pedido.</p>
          )}
        </div>
      </div>

      {pendingCredits > 0 && (
        <div className="bg-[var(--sage-50)] rounded-xl border border-[var(--sage-100)] p-5">
          <p className="font-medium text-[var(--sage-700)] mb-2">
            Tienes {pendingCredits} {pendingCredits === 1 ? "cita pendiente de reservar" : "citas pendientes de reservar"}
          </p>
          <Button asChild size="sm">
            <Link href="/mi-cuenta/citas">Reservar ahora</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
