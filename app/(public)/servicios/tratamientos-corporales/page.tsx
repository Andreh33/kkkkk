import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tratamientos Corporales — Modelado y Reafirmación",
  description:
    "Adelgazamiento, reducción de grasa localizada, celulitis y reafirmación en Forma y Línea Ciudad Real.",
};

export default function TratamientosCorporalesPage() {
  return (
    <div className="pt-20">
      <section className="bg-[var(--bg-deep)] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            35 años de resultados
          </p>
          <h1 className="font-display text-display-lg text-[var(--text-strong)]">
            Tratamientos Corporales
          </h1>
          <p className="text-body text-[var(--text-soft)] mt-4 max-w-xl mx-auto">
            Nuestro origen. El método Forma y Línea ha ayudado a adelgazar a más de 70.000
            personas combinando tecnología avanzada y métodos naturales.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[var(--bg-cream)] rounded-2xl p-10 border border-[var(--line)]">
            <p className="text-body text-[var(--text-soft)] mb-8">
              Nuestro equipo elabora un plan personalizado según tu situación. Contacta con nosotros
              para conocer los tratamientos corporales disponibles.
            </p>
            <Button asChild>
              <Link href="/contacto">Solicitar información</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
