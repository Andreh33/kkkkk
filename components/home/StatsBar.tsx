"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "35+", label: "Años de experiencia" },
  { value: "70.000+", label: "Personas atendidas" },
  { value: "4,7 ★", label: "Valoración Google" },
  { value: "22", label: "Cabinas" },
];

export function StatsBar() {
  return (
    <section className="bg-[var(--bg-deep)] py-10 sm:py-12 border-y border-[var(--line)]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-display-md text-[var(--gold-700)] font-semibold">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--text-soft)] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
