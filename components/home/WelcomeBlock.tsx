"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LeafBranch } from "@/components/decor/LeafBranch";
import { Button } from "@/components/ui/button";

export function WelcomeBlock() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-white)] overflow-hidden">
      <LeafBranch className="absolute top-10 right-0 w-40 sm:w-56 opacity-30 rotate-12" color="gold" />
      <LeafBranch className="absolute bottom-10 left-0 w-40 sm:w-56 opacity-25 -rotate-12" color="sage" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <Image
                src="/quiensoy/quien-soy-maria-jose-requena-directora-forma-linea-ciudad-real.jpg"
                alt="María José Requena — Directora de Forma y Línea Ciudad Real"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 300px, 400px"
                priority
              />
            </div>
            <LeafBranch
              className="absolute -right-4 -bottom-4 w-24 opacity-70"
              color="sage"
            />
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Bienvenida
            </p>
            <h2 className="font-display text-display-md text-[var(--text-strong)] mb-6">
              Más de 35 años cuidando tu{" "}
              <span className="text-accent-italic">belleza</span>
            </h2>
            <div className="space-y-4 text-body text-[var(--text-soft)]">
              <p>
                Soy <strong className="text-[var(--text-base)] font-medium">María José Requena</strong>, directora del
                centro Forma y Línea en Ciudad Real. Desde los años 80, me he dedicado a ayudar a
                miles de personas a encontrarse mejor consigo mismas.
              </p>
              <p>
                Combinamos las tecnologías más avanzadas con la tradición para responder a las
                necesidades de cada persona de forma integral y holística. Porque detrás de cada
                objetivo estético hay una persona que merece sentirse bien.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link href="/quien-soy" className="inline-flex items-center gap-2">
                  Conoce mi historia <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
