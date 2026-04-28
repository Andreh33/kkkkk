import type { Metadata } from "next";
import { Clock } from "lucide-react";

import { LineDivider } from "@/components/decor/LineDivider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Masajes — Relajación y Bienestar en Ciudad Real",
  description:
    "Descubre nuestra colección de masajes: aroma masaje, balinés, lomi-lomi, thai herbal y más. Reserva tu cita en línea.",
};

const MASSAGES = [
  {
    name: "Aroma Masaje",
    duration: "60 min",
    price: 60,
    priceDisplay: "60,00 €",
    description:
      "Un viaje sensorial de profunda relajación. Aceites esenciales seleccionados envuelven tu cuerpo mientras técnicas de effleurage y petrissage liberan la tensión acumulada. Ideal para el estrés y la fatiga.",
    variants: null,
    slug: "aroma-masaje",
  },
  {
    name: "Foot Massage",
    duration: "30-45 min",
    price: 45,
    priceDisplay: "45-60 €",
    description:
      "La reflexología podal activa los puntos de energía del pie para equilibrar órganos y sistemas de todo el cuerpo. Un tratamiento pequeño con grandes efectos.",
    variants: [
      { label: "30 min", price: 45 },
      { label: "45 min", price: 60 },
    ],
    slug: "foot-massage",
  },
  {
    name: "Masaje a 4 Manos",
    duration: "60 min",
    price: 150,
    priceDisplay: "150,00 €",
    description:
      "Dos terapeutas, cuatro manos, un solo ritmo. Esta experiencia de sincronía perfecta multiplica la sensación de bienestar y desconexión total.",
    variants: null,
    slug: "masaje-4-manos",
  },
  {
    name: "Masaje Balinés",
    duration: "60-90 min",
    price: 60,
    priceDisplay: "60-90 €",
    description:
      "Originario de la isla de los dioses, combina acupresión, técnicas de masaje suave y aromaterapia con aceites tropicales para equilibrar energía y relajar profundamente.",
    variants: [
      { label: "60 min", price: 60 },
      { label: "90 min", price: 90 },
    ],
    slug: "masaje-balinees",
  },
  {
    name: "Breves Delicias",
    duration: "30 min",
    price: 45,
    priceDisplay: "45,00 €",
    description:
      "El placer en formato exprés. Treinta minutos de masaje enfocado en las zonas de mayor tensión: cuello, hombros y espalda alta. Perfecto para el descanso de mediodía.",
    variants: null,
    slug: "breves-delicias",
  },
  {
    name: "Him & Her (Pareja)",
    duration: "60-75 min",
    price: 150,
    priceDisplay: "150-170 €",
    description:
      "Compartid el bienestar. Dos cabinas contiguas, dos terapeutas, una experiencia íntima y renovadora que fortalece el vínculo mientras relajáis cuerpo y mente juntos.",
    variants: [
      { label: "60 min", price: 150 },
      { label: "75 min", price: 170 },
    ],
    slug: "masaje-pareja",
  },
  {
    name: "Masaje Lomi-Lomi",
    duration: "60-90 min",
    price: 60,
    priceDisplay: "60-90 €",
    description:
      "La sagrada danza hawaiana del masaje. Movimientos largos y fluidos con los antebrazos imitan las olas del océano, disolviendo bloqueos físicos y emocionales.",
    variants: [
      { label: "60 min", price: 60 },
      { label: "90 min", price: 90 },
    ],
    slug: "lomi-lomi",
  },
  {
    name: "Thai Herbal Masaje",
    duration: "90 min",
    price: 120,
    priceDisplay: "120,00 €",
    description:
      "Bolsas de hierbas tailandesas calientes prensadas sobre el cuerpo. Lemongrass, cúrcuma y jengibre penetran en músculos y articulaciones, aliviando dolores y mejorando la circulación.",
    variants: null,
    slug: "thai-herbal",
  },
];

export default function MasajesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[var(--bg-deep)] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Spa & Bienestar
          </p>
          <h1 className="font-display text-display-lg text-[var(--text-strong)]">
            Masajes
          </h1>
          <p className="text-body text-[var(--text-soft)] mt-4">
            Técnicas orientales y occidentales para liberar tensión, mejorar la circulación y
            reconectar con tu bienestar.
          </p>
        </div>
      </section>

      {/* Listado */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-5xl mx-auto space-y-12">
          {MASSAGES.map((massage, i) => (
            <div key={massage.slug}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 items-start">
                <div className="sm:col-span-2">
                  <div className="flex items-start gap-4 mb-3">
                    <h2 className="font-display text-2xl sm:text-3xl text-[var(--text-strong)]">
                      {massage.name}
                    </h2>
                    {massage.variants && (
                      <Badge variant="sage" className="mt-1 flex-shrink-0">
                        Variantes
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-sm text-[var(--text-mute)]">
                    <Clock className="h-4 w-4" />
                    <span>{massage.duration}</span>
                  </div>
                  <p className="text-body text-[var(--text-soft)] leading-relaxed">
                    {massage.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-[var(--bg-cream)] rounded-xl p-5 text-center border border-[var(--line)]">
                    <p className="font-display text-3xl text-[var(--gold-700)] font-semibold mb-1">
                      {massage.priceDisplay}
                    </p>
                    <p className="text-xs text-[var(--text-mute)] mb-4">IVA incluido</p>
                    {massage.variants ? (
                      <div className="space-y-2">
                        {massage.variants.map((v) => (
                          <Button
                            key={v.label}
                            variant="outline"
                            size="sm"
                            className="w-full"
                            asChild
                          >
                            <a href={`/tienda/${massage.slug}-${v.label.replace(/\s/g, "-")}`}>
                              Reservar {v.label} — {v.price}€
                            </a>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <Button className="w-full" asChild>
                        <a href={`/tienda/${massage.slug}`}>Reservar cita</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {i < MASSAGES.length - 1 && <LineDivider className="mt-12" />}
            </div>
          ))}
        </div>
      </section>

      {/* Aviso */}
      <section className="py-12 px-4 sm:px-6 bg-[var(--sage-50)] text-center border-t border-[var(--sage-100)]">
        <p className="text-body-sm text-[var(--sage-700)]">
          ¿No encuentras el hueco perfecto?{" "}
          <a href="tel:+34664649181" className="font-medium underline">
            Llámanos al (+34) 664 649 181
          </a>{" "}
          y te ayudamos a encontrar el momento perfecto.
        </p>
      </section>
    </div>
  );
}
