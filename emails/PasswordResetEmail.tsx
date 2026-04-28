import { Button, Section, Text } from "@react-email/components";

import { BaseLayout, buttonStyle, headingStyle, paragraphStyle } from "./BaseLayout";

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
}

export default function PasswordResetEmail({ name, resetUrl }: PasswordResetEmailProps) {
  return (
    <BaseLayout preview="Restablece tu contraseña en Forma y Línea">
      <Text style={headingStyle}>Restablece tu contraseña</Text>
      <Text style={paragraphStyle}>Hola {name},</Text>
      <Text style={paragraphStyle}>
        Has solicitado restablecer la contraseña de tu cuenta. Pulsa el botón siguiente para crear
        una nueva. Este enlace expira en 30 minutos.
      </Text>
      <Section style={{ marginTop: 24 }}>
        <Button href={resetUrl} style={buttonStyle}>
          Restablecer contraseña
        </Button>
      </Section>
      <Text style={{ ...paragraphStyle, fontSize: 13, color: "#9A8F7E", marginTop: 20 }}>
        Si no solicitaste este cambio, ignora este correo. Tu contraseña actual seguirá siendo
        válida.
      </Text>
    </BaseLayout>
  );
}
