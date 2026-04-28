import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FloralCorner } from "@/components/decor/FloralCorner";
import { LeafBranch } from "@/components/decor/LeafBranch";
import { LineDivider } from "@/components/decor/LineDivider";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Quién soy — María José Requena",
  description:
    "Más de 35 años en el mundo de la estética y el bienestar. Conoce a María José Requena, directora de Forma y Línea Ciudad Real.",
};

const STORY_PARAGRAPHS = [
  "Forma y línea nació en Francia en los años 80 y se extendió rápidamente por toda Europa (Bélgica, Suiza, Italia y España). Nos pusimos en marcha tanto Josefina (alma mater de la empresa) como yo para traer este sistema tan innovador a España y para poder abrir uno de los primeros centros en España. La estética siempre había sido un mundo que nos apasionaba y este método además nos llenaba más todavía ya que conseguíamos ayudar a muchas personas sobre todo mujeres que no se encontraban bien consigo mismo con un método efectivo y rápido, sin necesidad de tomar pastillas que en aquella época estaban de moda, pero perjudicaban mucho la salud.",
  "Quisimos exportar ese método a España porque no había nada en aquella época igual, no existía ninguna franquicia, y menos en adelgazamiento.",
  "Y empezamos montando un centro en Alcázar de San Juan, el éxito fue tan grande que muy pronto abrimos delegaciones en Valencia, Ciudad Real, Orihuela y finalmente en Murcia.",
  "En poco tiempo la franquicia pasó de 1 centro a más de 25 y se extendió por toda España.",
  "Poco a poco y porque la demanda nos lo exigía, fuimos ampliando los servicios y aparte de adelgazamiento fuimos integrando un servicio de estética facial, más tecnologías para tratamientos corporales de grasa localizada, celulitis y reafirmación mejorando los servicios y respondiendo a la demanda, servicio de medicina-estética y finalmente un spa de masajes orientales con diferentes terapias alternativas de relajación y bienestar.",
  "Nos gusta unir las tecnologías más avanzadas con la tradición para así responder mejor a las necesidades de cada persona en su conjunto y de forma integral y holística.",
  "Porque tras 35 años de experiencia hemos podido comprobar que detrás de cada problema físico y estético está detrás uno psicológico, nutricional o un desequilibrio del cuerpo.",
  "Nuestra meta es de poder ayudar al máximo de personas a encontrarse mejor consigo mismo con métodos naturales alternativos y aparatología estética.",
  "Tras 35 años de existencia, podemos decir que hemos podido ayudar a adelgazar a más de 70.000 personas.",
];

export default function QuienSoyPage() {
  return (
    <div className="pt-20">
      {/* Hero pequeño */}
      <section className="relative bg-[var(--bg-deep)] py-20 sm:py-28 overflow-hidden">
        <FloralCorner className="absolute top-0 left-0 w-48 sm:w-64 opacity-80" color="gold" />
        <FloralCorner className="absolute bottom-0 right-0 w-48 sm:w-64 opacity-80" color="gold" flip />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Directora
          </p>
          <h1 className="font-display text-display-lg text-[var(--text-strong)]">
            María José Requena
          </h1>
          <p className="text-body text-[var(--text-soft)] mt-4">
            Forma y Línea Ciudad Real
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Foto lateral */}
            <div className="relative lg:col-span-1 lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <Image
                  src="/quiensoy/quien-soy-maria-jose-requena-directora-forma-linea-ciudad-real.jpg"
                  alt="María José Requena — Directora de Forma y Línea Ciudad Real"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
              <LeafBranch className="absolute -right-3 -bottom-3 w-20 opacity-70" color="sage" />
            </div>

            {/* Texto */}
            <div className="lg:col-span-2">
              <LineDivider color="gold" className="mb-10" />
              <div className="space-y-6">
                {STORY_PARAGRAPHS.map((para, i) => (
                  <p key={i} className="text-body text-[var(--text-soft)] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <LineDivider color="gold" className="mt-10 mb-8" />
              <div className="bg-[var(--bg-cream)] rounded-xl p-6 border border-[var(--line)]">
                <p className="font-display text-xl text-[var(--text-strong)] mb-4">
                  ¿Lista para empezar tu cambio?
                </p>
                <p className="text-body-sm text-[var(--text-soft)] mb-6">
                  Reserva tu primera consulta gratuita y descubre cómo podemos ayudarte.
                </p>
                <Button asChild>
                  <Link href="/contacto">Reservar consulta gratuita</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
