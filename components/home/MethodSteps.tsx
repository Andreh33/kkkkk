"use client";

import { motion } from "framer-motion";

import { LeafBranch } from "@/components/decor/LeafBranch";
import { LineDivider } from "@/components/decor/LineDivider";
import { SmallSprig } from "@/components/decor/SmallSprig";

const STEPS = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Evaluamos tu situación de forma personalizada para entender tus objetivos y necesidades reales.",
  },
  {
    num: "02",
    title: "Plan personalizado",
    desc: "Diseñamos un protocolo a medida combinando tecnología, masajes y medicina estética.",
  },
  {
    num: "03",
    title: "Resultados",
    desc: "Seguimiento continuo para garantizar que alcances tus objetivos de forma duradera.",
  },
];

export function MethodSteps() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-base)] overflow-hidden">
      <LeafBranch className="absolute top-2 left-4 w-48 sm:w-60 opacity-70" color="sage" />
      <LeafBranch className="absolute bottom-2 right-4 w-48 sm:w-60 opacity-70 rotate-180" color="gold" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Nuestra filosofía
          </p>
          <h2 className="font-display text-display-md text-[var(--text-strong)]">
            El método <span className="text-accent-italic">Forma y Línea</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <p className="font-display text-[5rem] sm:text-[6rem] leading-none text-[var(--gold-300)] font-semibold mb-4 opacity-60">
                {step.num}
              </p>
              <SmallSprig className="mx-auto mb-3 w-10 opacity-70" />
              <h3 className="font-display text-2xl text-[var(--text-strong)] mb-3">
                {step.title}
              </h3>
              <p className="text-body-sm text-[var(--text-soft)]">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <LineDivider className="mt-16" color="gold" />
      </div>
    </section>
  );
}
