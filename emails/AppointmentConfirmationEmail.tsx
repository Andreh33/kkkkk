import { Button, Section, Text } from "@react-email/components";

import { BaseLayout, buttonStyle, headingStyle, paragraphStyle } from "./BaseLayout";

interface AppointmentConfirmationEmailProps {
  name: string;
  serviceName: string;
  startsAt: Date;
  endsAt: Date;
  durationMin: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://formaylinea.vercel.app";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function AppointmentConfirmationEmail({
  name,
  serviceName,
  startsAt,
  endsAt,
  durationMin,
}: AppointmentConfirmationEmailProps) {
  return (
    <BaseLayout preview={`Tu cita de ${serviceName} está confirmada`}>
      <Text style={headingStyle}>Tu cita está confirmada</Text>
      <Text style={paragraphStyle}>Hola {name},</Text>
      <Text style={paragraphStyle}>
        Hemos reservado tu cita de <strong>{serviceName}</strong>. Adjuntamos un archivo .ics para
        que puedas añadirla a tu calendario.
      </Text>

      <Section
        style={{
          backgroundColor: "#FAF6EE",
          borderRadius: 12,
          padding: 16,
          margin: "16px 0",
          textAlign: "center" as const,
        }}
      >
        <Text style={{ ...paragraphStyle, fontSize: 14, color: "#9A8F7E", margin: "0 0 4px" }}>
          {formatDate(startsAt)}
        </Text>
        <Text style={{ ...paragraphStyle, fontSize: 18, fontWeight: 600, color: "#2A2622", margin: 0 }}>
          {serviceName}
        </Text>
        <Text style={{ ...paragraphStyle, fontSize: 13, color: "#9A8F7E", margin: "4px 0 0" }}>
          {durationMin} minutos · Pasaje Dulcinea del Toboso 3, Ciudad Real
        </Text>
      </Section>

      <Text style={{ ...paragraphStyle, fontSize: 13 }}>
        Te recomendamos llegar 10 minutos antes. Si necesitas modificar o cancelar la cita,
        contacta con nosotros al menos con 24 horas de antelación.
      </Text>

      <Section style={{ marginTop: 24 }}>
        <Button href={`${BASE_URL}/mi-cuenta/citas`} style={buttonStyle}>
          Ver mis citas
        </Button>
      </Section>
    </BaseLayout>
  );
}
