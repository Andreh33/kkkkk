import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies de Forma y Línea Ciudad Real.",
  robots: { index: false },
};

export default function PoliticaCookiesPage() {
  return (
    <div className="pt-20">
      <section className="bg-[var(--bg-deep)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-display-md text-[var(--text-strong)]">
            Política de Cookies
          </h1>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-[var(--text-strong)] prose-p:text-[var(--text-soft)]">
          <h2>¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu
            dispositivo cuando los visitas. Nos permiten recordar tus preferencias y mejorar tu
            experiencia de navegación.
          </p>

          <h2>Cookies que utilizamos</h2>
          <table>
            <thead>
              <tr><th>Nombre</th><th>Tipo</th><th>Duración</th><th>Propósito</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>fyl-cart</td><td>Necesaria</td><td>Sesión</td>
                <td>Almacena el carrito de la compra.</td>
              </tr>
              <tr>
                <td>next-auth.session-token</td><td>Necesaria</td><td>30 días</td>
                <td>Mantiene la sesión de usuario iniciada.</td>
              </tr>
              <tr>
                <td>fyl_consent</td><td>Necesaria</td><td>1 año</td>
                <td>Recuerda tu elección de consentimiento de cookies.</td>
              </tr>
              <tr>
                <td>_ga</td><td>Analítica</td><td>2 años</td>
                <td>Google Analytics — análisis de visitas anónimo (solo con consentimiento).</td>
              </tr>
            </tbody>
          </table>

          <h2>Cómo gestionar tus preferencias</h2>
          <p>
            Puedes reconfigurar tus preferencias de cookies en cualquier momento haciendo clic en
            "Gestionar cookies" en el pie de página, o desactivarlas desde la configuración de tu
            navegador.
          </p>
          <p>
            Ten en cuenta que desactivar las cookies necesarias puede afectar al funcionamiento del
            sitio (p.ej., el carrito o el inicio de sesión).
          </p>

          <h2>Más información</h2>
          <p>
            Consulta nuestra <Link href="/politica-privacidad">Política de Privacidad</Link> para
            más información sobre el tratamiento de tus datos.
          </p>
        </div>
      </section>
    </div>
  );
}
