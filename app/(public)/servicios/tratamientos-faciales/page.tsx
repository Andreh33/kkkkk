import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tratamientos Faciales — Piel Sana y Luminosa",
  description:
    "Limpiezas, peelings, hidratación profunda y tecnología avanzada para una piel sana en Forma y Línea Ciudad Real.",
};

export default function TratamientosFacialesPage() {
  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1920&q=80"
          alt="Tratamientos faciales en Forma y Línea Ciudad Real"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-300)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Tu piel merece lo mejor
          </p>
          <h1 className="font-display text-display-lg text-white">Tratamientos Faciales</h1>
          <p className="text-body text-white/85 mt-4 max-w-xl mx-auto">
            Desde limpiezas profundas hasta tecnología de última generación. María José y su equipo
            diseñarán el protocolo perfecto para tu tipo de piel.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[var(--bg-cream)] rounded-2xl p-10 border border-[var(--line)]">
            <p className="text-body text-[var(--text-soft)] mb-8">
              Estamos ampliando nuestra oferta de tratamientos faciales. Contacta con nosotros para
              conocer los protocolos disponibles y diseñar tu rutina personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contacto">Solicitar información</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/servicios/medicina-estetica">Ver medicina estética</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
