import { Section, Text } from "@react-email/components";

import { BaseLayout, headingStyle, paragraphStyle } from "./BaseLayout";

interface AppointmentReminderEmailProps {
  name: string;
  serviceName: string;
  startsAt: Date;
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function AppointmentReminderEmail({
  name,
  serviceName,
  startsAt,
}: AppointmentReminderEmailProps) {
  return (
    <BaseLayout preview={`Recordatorio: tu cita es mañana`}>
      <Text style={headingStyle}>Te esperamos mañana</Text>
      <Text style={paragraphStyle}>Hola {name},</Text>
      <Text style={paragraphStyle}>
        Solo es un recordatorio: tienes una cita de <strong>{serviceName}</strong> programada para:
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
        <Text style={{ ...paragraphStyle, fontSize: 18, fontWeight: 600, color: "#2A2622", margin: 0 }}>
          {formatDate(startsAt)}
        </Text>
      </Section>
      <Text style={paragraphStyle}>
        Llega unos 10 minutos antes para que el equipo pueda atenderte con calma.
      </Text>
      <Text style={{ ...paragraphStyle, fontSize: 13, color: "#9A8F7E" }}>
        Si necesitas cancelar, llámanos lo antes posible al (+34) 664 649 181.
      </Text>
    </BaseLayout>
  );
}
