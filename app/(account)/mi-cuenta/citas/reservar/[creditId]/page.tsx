export const dynamic = "force-dynamic";

import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BookingCalendar } from "@/components/booking/BookingCalendar";

interface Props {
  params: Promise<{ creditId: string }>;
}

export default async function ReservarCitaPage({ params }: Props) {
  const { creditId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const credit = await prisma.serviceCredit.findFirst({
    where: { id: creditId, userId: session.user.id, redeemed: false },
    include: { service: true },
  });

  if (!credit) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-[var(--text-strong)]">Reservar cita</h1>
        <p className="text-body-sm text-[var(--text-soft)] mt-1">{credit.service.name}</p>
      </div>

      <div className="bg-[var(--bg-cream)] rounded-xl border border-[var(--line)] p-4">
        <p className="text-sm text-[var(--text-soft)]">
          Duración: <strong>{credit.service.durationMin} minutos</strong>
        </p>
      </div>

      <BookingCalendar
        creditId={credit.id}
        serviceId={credit.serviceId}
        durationMin={credit.service.durationMin}
      />

      <p className="text-sm text-[var(--text-soft)] text-center border-t border-[var(--line)] pt-6">
        ¿No encuentras hueco o prefieres hablar con nosotros?{" "}
        <a href="tel:+34664649181" className="font-medium text-[var(--gold-700)]">
          Llámanos al (+34) 664 649 181
        </a>{" "}
        y te ayudamos.
      </p>
    </div>
  );
}
