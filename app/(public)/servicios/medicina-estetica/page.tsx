import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Medicina Estética — Tratamientos No Invasivos",
  description:
    "HIFU, hilos tensores, rellenos faciales, PRP, neuromoduladores y mucho más. Medicina estética avanzada en Ciudad Real.",
};

const TREATMENTS = [
  {
    name: "Láser con Carbón Activado",
    desc: "Tratamiento de fotorejuvenecimiento que utiliza carbón activado para limpiar los poros en profundidad y reducir el exceso de sebo.",
  },
  {
    name: "Endolift",
    desc: "Lifting sin bisturí mediante fibra óptica láser que estimula la producción de colágeno desde el interior, reafirmando y levantando los tejidos.",
  },
  {
    name: "Hilos tensores",
    desc: "Elevación y reafirmación facial con hilos de sutura reabsorbibles que actúan como soporte y estimulan la neo-colagenoénesis.",
  },
  {
    name: "Neuromoduladores",
    desc: "Relajación controlada de los músculos de expresión para suavizar arrugas dinámicas y prevenir su formación.",
  },
  {
    name: "Láser Plasma — Blefaroplastia sin cirugía",
    desc: "Corrección del exceso de piel en párpados superiores e inferiores mediante plasma frío, sin incisiones.",
  },
  {
    name: "Radiofrecuencia facial",
    desc: "Estimulación del colágeno profundo con calor controlado para tensar, reafirmar y rejuvenecer la piel del rostro y el cuello.",
  },
  {
    name: "Rellenos faciales",
    desc: "Restauración del volumen perdido y corrección de surcos con ácido hialurónico reticulado de alta calidad.",
  },
  {
    name: "Infiltraciones con Radiesse",
    desc: "Relleno con hidroxiapatita cálcica que aporta volumen inmediato y estimula la producción de colágeno a largo plazo.",
  },
  {
    name: "Mesoterapia con ácido hialurónico",
    desc: "Hidratación profunda intradérmica para recuperar la luminosidad, elasticidad y textura de la piel.",
  },
  {
    name: "Mesoterapia contra la alopecia",
    desc: "Cocktail de vitaminas, minerales y factores de crecimiento inyectados en el cuero cabelludo para frenar la caída y estimular el cabello.",
  },
  {
    name: "Mesoplastia facial",
    desc: "Técnica de revitalización con microinyecciones superficiales que regeneran la piel y aportan efecto flash inmediato.",
  },
  {
    name: "Peeling químico",
    desc: "Exfoliación controlada con ácidos (glicólico, mandélico, TCA) para renovar la piel, tratar manchas y mejorar la textura.",
  },
  {
    name: "Infiltraciones con silicio orgánico",
    desc: "Bioestimulación con silicio orgánico para mejorar la elasticidad cutánea, tratar la rosácea y articulaciones.",
  },
  {
    name: "Rinomodelación sin cirugía",
    desc: "Corrección de la nariz con ácido hialurónico: resulta invisible para el médico estético.",
  },
  {
    name: "Elimina la papada con Prostolane",
    desc: "Solución inyectable lipolítica que reduce el exceso de grasa submentoniana sin cirugía ni anestesia general.",
  },
  {
    name: "Gluteolift",
    desc: "Aumento y modelado de glúteos con ácido hialurónico de alta densidad. Resultados naturales y duraderos.",
  },
  {
    name: "PRP — Plasma Rico en Plaquetas (Facial)",
    desc: "Uso del plasma propio del paciente cargado de factores de crecimiento para regenerar y rejuvenecer la piel del rostro.",
  },
  {
    name: "PRP — Plasma Rico en Plaquetas (Alopecia)",
    desc: "Tratamiento capilar con el plasma del propio paciente para frenar la caída y estimular el crecimiento del cabello.",
  },
  {
    name: "Sculptra",
    desc: "Bioestimulador de colágeno con ácido poli-L-láctico que produce resultados progresivos y naturales durante meses.",
  },
  {
    name: "Fototerapia antiacné",
    desc: "Luz azul y roja para eliminar la bacteria del acné, reducir la inflamación y acelerar la cicatrización.",
  },
  {
    name: "Fotorejuvenecimiento facial y corporal",
    desc: "IPL (Luz Pulsada Intensa) para tratar manchas, rojeces, rosácea y mejorar la textura general de la piel.",
  },
  {
    name: "Mesoterapia corporal",
    desc: "Coctel de principios activos para tratar celulitis, flacidez y reducir grasa localizada de forma específica.",
  },
  {
    name: "Eliminar varices — Esclerosis con espuma",
    desc: "Eliminación de arañas vasculares y varices mediante microinyecciones de espuma esclerosante.",
  },
  {
    name: "Hidrolipoclasia — Liposucción sin cirugía",
    desc: "Infiltración de suero fisiológico y aplicación de ultrasonidos para romper y eliminar células grasas de forma no invasiva.",
  },
  {
    name: "Lanluma",
    desc: "Bioestimulador de nueva generación para volumizar y regenerar la piel de forma gradual y muy natural.",
  },
  {
    name: "Foxy Eyes",
    desc: "Efecto raposa: elevación y elongación de la mirada con hilos o toxina botulínica sin cirugía.",
  },
  {
    name: "Aumento de labios",
    desc: "Perfilado y voluminización de labios con ácido hialurónico para un resultado natural y armónico.",
  },
  {
    name: "Rellenos de ojeras y bolsas",
    desc: "Corrección del surco nasoyugal y dark circles con ácido hialurónico ultrafino y técnica de canula.",
  },
];

export default function MedicinaEsteticaPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[var(--bg-deep)] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Sin bisturí
          </p>
          <h1 className="font-display text-display-lg text-[var(--text-strong)]">
            Medicina Estética
          </h1>
          <p className="text-body text-[var(--text-soft)] mt-4 max-w-xl mx-auto">
            Tratamientos no invasivos de última generación realizados por profesionales
            cualificados. Resultados naturales y duraderos.
          </p>
        </div>
      </section>

      {/* Aviso consulta presencial */}
      <section className="py-6 px-4 sm:px-6 bg-[var(--sage-50)] border-b border-[var(--sage-100)]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--sage-700)] text-center sm:text-left">
            Los tratamientos de medicina estética se realizan previa consulta presencial. Solicita
            información sin compromiso.
          </p>
          <Button asChild variant="sage" size="sm" className="flex-shrink-0">
            <Link href="/contacto">Solicitar información</Link>
          </Button>
        </div>
      </section>

      {/* Grid tratamientos */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TREATMENTS.map((t) => (
              <div
                key={t.name}
                className="bg-[var(--bg-cream)] rounded-xl p-6 border border-[var(--line)] hover:border-[var(--gold-300)] hover:shadow-md transition-all duration-300 group"
              >
                <h2 className="font-display text-lg text-[var(--text-strong)] mb-2 group-hover:text-[var(--gold-700)] transition-colors">
                  {t.name}
                </h2>
                <p className="text-body-sm text-[var(--text-soft)] leading-relaxed mb-4">
                  {t.desc}
                </p>
                <Link
                  href={`/contacto?asunto=Información sobre ${encodeURIComponent(t.name)}`}
                  className="inline-flex items-center gap-1 text-sm text-[var(--gold-700)] font-medium hover:gap-2 transition-all"
                >
                  Solicitar información <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
