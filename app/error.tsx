"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-cream)]">
      <div className="text-center">
        <h1 className="font-display text-3xl text-[var(--text-strong)] mb-3">
          Algo salió mal
        </h1>
        <p className="text-[var(--text-soft)] mb-8">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Intentar de nuevo</Button>
          <Button asChild variant="outline">
            <Link href="/">Ir al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
