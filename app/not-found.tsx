import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-cream)]">
      <div className="text-center">
        <p className="font-display text-[8rem] text-[var(--gold-300)] leading-none font-semibold">
          404
        </p>
        <h1 className="font-display text-3xl text-[var(--text-strong)] mb-3 -mt-4">
          Página no encontrada
        </h1>
        <p className="text-[var(--text-soft)] mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
