"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { FloralCorner } from "@/components/decor/FloralCorner";

const TESTIMONIALS = [
  {
    name: "Ana García",
    text: "Llevo 5 años viniendo al centro y los resultados son increíbles. María José y su equipo son profesionales excepcionales. Me siento en las mejores manos.",
    rating: 5,
  },
  {
    name: "Carmen López",
    text: "El masaje balinés fue una experiencia transformadora. Las instalaciones son impecables y el trato muy personalizado. ¡Volveré sin duda!",
    rating: 5,
  },
  {
    name: "Isabel Martínez",
    text: "Empecé el tratamiento corporal hace tres meses y los cambios son visibles. El equipo hace un seguimiento continuo que se agradece mucho.",
    rating: 5,
  },
];

export function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-deep)] overflow-hidden">
      <FloralCorner className="absolute bottom-0 left-0 w-48 sm:w-64 opacity-70 rotate-180 scale-y-[-1]" />
      <FloralCorner className="absolute bottom-0 right-0 w-48 sm:w-64 opacity-70 rotate-180 scale-y-[-1]" flip />
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Testimonios
          </p>
          <h2 className="font-display text-display-md text-[var(--text-strong)]">
            Lo que dicen nuestras <span className="text-accent-italic">clientas</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="text-center px-8">
            <span className="font-display text-7xl text-[var(--gold-300)] leading-none select-none" aria-hidden>
              "
            </span>
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display text-xl sm:text-2xl text-[var(--text-base)] leading-relaxed -mt-4 mb-6"
            >
              {TESTIMONIALS[current].text}
            </motion.blockquote>
            <div className="flex items-center justify-center gap-1 mb-3" aria-label={`${TESTIMONIALS[current].rating} estrellas`}>
              {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                <span key={i} className="text-[var(--gold-500)]">★</span>
              ))}
            </div>
            <p className="font-body font-medium text-[var(--text-soft)]">
              — {TESTIMONIALS[current].name}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              aria-label="Testimonio anterior"
              className="p-2 rounded-full border border-[var(--line)] text-[var(--text-soft)] hover:border-[var(--gold-500)] hover:text-[var(--gold-700)] transition-colors touch-target flex items-center justify-center"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ver testimonio ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-[var(--gold-500)]" : "bg-[var(--line)]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Testimonio siguiente"
              className="p-2 rounded-full border border-[var(--line)] text-[var(--text-soft)] hover:border-[var(--gold-500)] hover:text-[var(--gold-700)] transition-colors touch-target flex items-center justify-center"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
