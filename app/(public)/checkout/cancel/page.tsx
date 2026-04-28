import { XCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4 bg-[var(--bg-cream)]">
      <div className="max-w-md w-full text-center">
        <div className="bg-[var(--bg-white)] rounded-2xl border border-[var(--line)] p-10">
          <XCircle className="h-16 w-16 text-[var(--danger)] mx-auto mb-6" />
          <h1 className="font-display text-3xl text-[var(--text-strong)] mb-3">
            Pago cancelado
          </h1>
          <p className="text-body text-[var(--text-soft)] mb-8">
            No se ha procesado ningún cargo. Tu carrito sigue guardado.
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/carrito">Volver al carrito</Link>
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
