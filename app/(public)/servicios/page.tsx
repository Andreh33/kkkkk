import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios — Masajes, Medicina Estética y más",
  description:
    "Descubre todos los servicios de Forma y Línea Ciudad Real: masajes, medicina estética, tratamientos faciales y corporales.",
};

const CATEGORIES = [
  {
    title: "Masajes",
    description:
      "Desde el clásico aroma masaje hasta el lomi-lomi hawaiano. Técnicas orientales y occidentales para liberar tensión y reconectar con tu cuerpo.",
    href: "/servicios/masajes",
    image: "/hero/hero-poster.jpg",
  },
  {
    title: "Medicina Estética",
    description:
      "Tratamientos no invasivos de última generación: HIFU, hilos tensores, rellenos y neuromoduladores. Resultados naturales y duraderos.",
    href: "/servicios/medicina-estetica",
    image: "/hero/hero-poster.jpg",
  },
  {
    title: "Tratamientos Faciales",
    description:
      "Limpiezas profundas, peelings químicos y tecnología avanzada para lucir una piel sana y luminosa a cualquier edad.",
    href: "/servicios/tratamientos-faciales",
    image: "/hero/hero-poster.jpg",
  },
  {
    title: "Tratamientos Corporales",
    description:
      "Modelado, reafirmación y reducción de grasa localizada con los métodos más efectivos. 35 años avalan nuestros resultados.",
    href: "/servicios/tratamientos-corporales",
    image: "/hero/hero-poster.jpg",
  },
];

export default function ServiciosPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[var(--bg-deep)] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Nuestros tratamientos
          </p>
          <h1 className="font-display text-display-lg text-[var(--text-strong)]">
            Servicios especializados
          </h1>
          <p className="text-body text-[var(--text-soft)] mt-4 max-w-xl mx-auto">
            Combinamos tecnología avanzada con técnicas tradicionales para ofrecerte el mejor
            resultado en cada visita.
          </p>
        </div>
      </section>

      {/* Grid de categorías */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {CATEGORIES.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-video mb-5 bg-[var(--bg-deep)]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h2 className="absolute bottom-5 left-6 font-display text-2xl sm:text-3xl text-white font-semibold">
                  {cat.title}
                </h2>
              </div>
              <p className="text-body-sm text-[var(--text-soft)] leading-relaxed mb-3">
                {cat.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-[var(--gold-700)] font-medium group-hover:gap-2 transition-all">
                Ver tratamientos <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
