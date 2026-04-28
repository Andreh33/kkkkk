export const dynamic = "force-dynamic";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CONTACT } from "@/lib/constants";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

async function getUnredeemedCredits(userId: string) {
  return prisma.serviceCredit.findMany({
    where: { userId, redeemed: false },
    include: { service: true },
    take: 1,
  });
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const session = await auth();
  const credits = session?.user
    ? await getUnredeemedCredits(session.user.id)
    : [];
  const firstCredit = credits[0];

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4 bg-[var(--bg-cream)]">
      <div className="max-w-md w-full text-center">
        <div className="bg-[var(--bg-white)] rounded-2xl border border-[var(--line)] p-10">
          <CheckCircle className="h-16 w-16 text-[var(--success)] mx-auto mb-6" />
          <h1 className="font-display text-3xl text-[var(--text-strong)] mb-3">
            ¡Pago completado!
          </h1>
          <p className="text-body text-[var(--text-soft)] mb-8">
            Te hemos enviado un email con la confirmación de tu pedido.
          </p>

          {firstCredit && (
            <div className="bg-[var(--sage-50)] rounded-xl p-5 mb-6 border border-[var(--sage-100)]">
              <p className="font-medium text-[var(--sage-700)] mb-3">
                ¡Ya puedes reservar tu cita!
              </p>
              <p className="text-sm text-[var(--text-soft)] mb-4">
                Has comprado una sesión de {firstCredit.service.name}.
              </p>
              <Button asChild size="sm">
                <Link href={`/mi-cuenta/citas/reservar/${firstCredit.id}`}>
                  Reservar tu cita ahora
                </Link>
              </Button>
            </div>
          )}

          {firstCredit && (
            <p className="text-sm text-[var(--text-soft)] mb-6">
              Si no sabes cuándo coger cita, llámanos al{" "}
              <a
                href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
                className="font-medium text-[var(--gold-700)]"
              >
                {CONTACT.phone2}
              </a>{" "}
              y te ayudamos a encontrar el momento perfecto.
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Button asChild variant="outline">
              <Link href="/mi-cuenta/pedidos">Ver mis pedidos</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
