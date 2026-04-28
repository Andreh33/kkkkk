import { Button, Section, Text } from "@react-email/components";

import { BaseLayout, buttonStyle, headingStyle, paragraphStyle } from "./BaseLayout";

interface WelcomeEmailProps {
  name: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://formaylinea.vercel.app";

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <BaseLayout preview={`Bienvenida a Forma y Línea, ${name}`}>
      <Text style={headingStyle}>¡Bienvenida, {name}!</Text>
      <Text style={paragraphStyle}>
        Gracias por registrarte en Forma y Línea Ciudad Real. Acabas de unirte a una comunidad
        que lleva más de 35 años cuidando del bienestar de miles de personas.
      </Text>
      <Text style={paragraphStyle}>
        Desde tu cuenta podrás reservar citas, comprar productos cosméticos, consultar tu historial
        y mucho más.
      </Text>
      <Section style={{ marginTop: 24 }}>
        <Button href={`${BASE_URL}/mi-cuenta`} style={buttonStyle}>
          Ir a mi cuenta
        </Button>
      </Section>
    </BaseLayout>
  );
}
