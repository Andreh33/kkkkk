import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal de Forma y Línea Ciudad Real.",
  robots: { index: false },
};

export default function AvisoLegalPage() {
  return (
    <div className="pt-20">
      <section className="bg-[var(--bg-deep)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-display-md text-[var(--text-strong)]">Aviso Legal</h1>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-[var(--text-strong)] prose-p:text-[var(--text-soft)]">
          <h2>1. Datos identificativos</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
            Sociedad de la Información y de Comercio Electrónico, se informa:
          </p>
          <ul>
            <li><strong>Denominación social:</strong> Forma y Línea Ciudad Real</li>
            <li><strong>CIF:</strong> [COMPLETAR: CIF de la empresa]</li>
            <li><strong>Domicilio social:</strong> Pasaje Dulcinea del Toboso 3, 13001 Ciudad Real</li>
            <li><strong>Registro Mercantil:</strong> [COMPLETAR: datos registrales]</li>
            <li><strong>Email:</strong> info@formaylinea.info</li>
            <li><strong>Teléfono:</strong> (+34) 926 253 454</li>
          </ul>

          <h2>2. Objeto y ámbito de aplicación</h2>
          <p>
            El presente Aviso Legal regula el acceso y uso del sitio web www.formaylinea.com
            (en adelante, el "Sitio Web"), titularidad de Forma y Línea Ciudad Real.
          </p>

          <h2>3. Condiciones de uso</h2>
          <p>
            El acceso y uso del Sitio Web implica la aceptación plena de las condiciones
            establecidas en este Aviso Legal. Forma y Línea Ciudad Real se reserva el derecho de
            modificar unilateralmente estas condiciones.
          </p>

          <h2>4. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del Sitio Web (textos, imágenes, logotipos, diseño, etc.) son
            propiedad de Forma y Línea Ciudad Real o de terceros que han autorizado su uso. Queda
            prohibida su reproducción sin autorización expresa.
          </p>

          <h2>5. Responsabilidad</h2>
          <p>
            Forma y Línea Ciudad Real no se responsabiliza de los daños derivados del uso del
            Sitio Web, de la interrupción del servicio ni de los posibles errores en los contenidos.
          </p>

          <h2>6. Legislación aplicable y jurisdicción</h2>
          <p>
            Este Aviso Legal se rige por la legislación española. Para la resolución de cualquier
            controversia, las partes se someten a los Juzgados y Tribunales de Ciudad Real.
          </p>
        </div>
      </section>
    </div>
  );
}
