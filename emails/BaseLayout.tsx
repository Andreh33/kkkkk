import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface BaseLayoutProps {
  preview: string;
  children: React.ReactNode;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://formaylinea.vercel.app";

export function BaseLayout({ preview, children }: BaseLayoutProps) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: "#F7F3EC",
          fontFamily: "Inter, system-ui, sans-serif",
          padding: "32px 0",
          margin: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid #E8E2D7",
            padding: "32px",
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          <Section style={{ textAlign: "center", marginBottom: 24 }}>
            <Img
              src={`${BASE_URL}/logo/logo-forma-linea-1920x1080-1.png`}
              alt="Forma y Línea"
              width={140}
              style={{ display: "inline-block" }}
            />
          </Section>
          {children}
          <Hr style={{ borderColor: "#E8E2D7", margin: "32px 0 16px" }} />
          <Text style={{ color: "#9A8F7E", fontSize: 12, textAlign: "center", margin: 0 }}>
            Forma y Línea Ciudad Real · Pasaje Dulcinea del Toboso 3
            <br />
            <Link href={BASE_URL} style={{ color: "#B89968" }}>
              formaylinea.vercel.app
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const headingStyle = {
  fontFamily: "Cormorant Garamond, Georgia, serif",
  fontSize: 28,
  color: "#2A2622",
  fontWeight: 600 as const,
  margin: "0 0 16px",
};

export const paragraphStyle = {
  color: "#544E45",
  fontSize: 15,
  lineHeight: "1.7",
  margin: "0 0 12px",
};

export const buttonStyle = {
  backgroundColor: "#B89968",
  color: "#FFFFFF",
  padding: "12px 24px",
  borderRadius: 8,
  textDecoration: "none",
  fontWeight: 500 as const,
  display: "inline-block",
};
