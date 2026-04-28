"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FloralCorner } from "@/components/decor/FloralCorner";
import { LineDivider } from "@/components/decor/LineDivider";

const SERVICES = [
  {
    title: "Masajes",
    description: "Desde el clásico aroma masaje hasta técnicas orientales. Bienestar profundo para cuerpo y mente.",
    href: "/servicios/masajes",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
    color: "sage",
  },
  {
    title: "Medicina Estética",
    description: "Tratamientos avanzados no invasivos: HIFU, rellenos, neuromoduladores y mucho más.",
    href: "/servicios/medicina-estetica",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
    color: "gold",
  },
  {
    title: "Tratamientos Faciales",
    description: "Limpiezas, peelings y tecnología de última generación para una piel radiante.",
    href: "/servicios/tratamientos-faciales",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    color: "sage",
  },
  {
    title: "Tratamientos Corporales",
    description: "Adelgazamiento, reafirmación y modelado corporal con métodos probados en 35 años.",
    href: "/servicios/tratamientos-corporales",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
    color: "gold",
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-cream)] overflow-hidden">
      <FloralCorner className="absolute top-0 left-0 w-44 sm:w-64 opacity-80" />
      <FloralCorner className="absolute top-0 right-0 w-44 sm:w-64 opacity-80" flip />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Nuestros tratamientos
          </p>
          <h2 className="font-display text-display-md text-[var(--text-strong)]">
            Servicios especializados para{" "}
            <span className="text-accent-italic">tu bienestar</span>
          </h2>
        </motion.div>
        <LineDivider className="mx-auto mb-14 w-48 opacity-70" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={service.href} className="group block">
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 bg-[var(--bg-deep)]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-white text-xl font-semibold mb-1">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-soft)] leading-relaxed mb-3">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-[var(--gold-700)] font-medium group-hover:gap-2 transition-all">
                  Ver tratamientos <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
