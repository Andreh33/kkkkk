import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Forma y Línea Ciudad Real conforme al RGPD.",
  robots: { index: false },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="pt-20">
      <section className="bg-[var(--bg-deep)] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-display-md text-[var(--text-strong)]">
            Política de Privacidad
          </h1>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-[var(--text-strong)] prose-p:text-[var(--text-soft)]">
          <p>Última actualización: enero de 2025</p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>Identidad:</strong> Forma y Línea Ciudad Real<br />
            <strong>CIF:</strong> [COMPLETAR]<br />
            <strong>Dirección:</strong> Pasaje Dulcinea del Toboso 3, 13001 Ciudad Real<br />
            <strong>Email:</strong> info@formaylinea.info
          </p>

          <h2>2. Datos que recogemos</h2>
          <p>Recogemos los siguientes datos personales:</p>
          <ul>
            <li>Datos de identificación: nombre, email, teléfono.</li>
            <li>Datos de facturación y envío: dirección postal.</li>
            <li>Datos de uso del sitio web: cookies analíticas (con consentimiento).</li>
            <li>Mensajes de contacto y consultas.</li>
          </ul>

          <h2>3. Finalidad del tratamiento</h2>
          <ul>
            <li>Gestionar tu cuenta de usuario y tus pedidos.</li>
            <li>Gestionar reservas de citas.</li>
            <li>Responder a consultas y mensajes de contacto.</li>
            <li>Enviar newsletter (solo con tu consentimiento expreso).</li>
            <li>Cumplir obligaciones legales y fiscales.</li>
          </ul>

          <h2>4. Base legal del tratamiento</h2>
          <ul>
            <li>Ejecución de un contrato (gestión de pedidos y citas).</li>
            <li>Consentimiento (newsletter, cookies analíticas).</li>
            <li>Obligación legal (facturación, contabilidad).</li>
            <li>Interés legítimo (seguridad del sitio web).</li>
          </ul>

          <h2>5. Destinatarios de los datos</h2>
          <p>
            Tus datos no se ceden a terceros salvo obligación legal o para el correcto
            funcionamiento del servicio (procesador de pagos Stripe, plataforma de email Resend).
            Todos los proveedores cumplen con el RGPD.
          </p>

          <h2>6. Transferencias internacionales</h2>
          <p>
            Algunos proveedores (Stripe, Resend) pueden almacenar datos en servidores fuera del EEE
            pero con garantías adecuadas conforme al Reglamento (UE) 2016/679.
          </p>

          <h2>7. Tus derechos</h2>
          <p>Puedes ejercer en cualquier momento los derechos de:</p>
          <ul>
            <li>Acceso, rectificación, supresión y portabilidad de tus datos.</li>
            <li>Limitación u oposición al tratamiento.</li>
            <li>Retirada del consentimiento prestado.</li>
          </ul>
          <p>
            Escríbenos a info@formaylinea.info con el asunto "Derechos RGPD". También puedes
            presentar reclamación ante la AEPD (www.aepd.es).
          </p>

          <h2>8. Conservación de datos</h2>
          <p>
            Los datos de cliente se conservan durante la relación contractual y los 5 años
            siguientes por obligaciones fiscales. Los mensajes de contacto, 2 años. Los datos de
            newsletter, hasta que retires el consentimiento.
          </p>
        </div>
      </section>
    </div>
  );
}
