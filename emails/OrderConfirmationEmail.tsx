import { Button, Hr, Section, Text } from "@react-email/components";

import { BaseLayout, buttonStyle, headingStyle, paragraphStyle } from "./BaseLayout";

interface OrderConfirmationEmailProps {
  name: string;
  orderId: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  subtotal: number;
  shipping: number;
  total: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://formaylinea.vercel.app";

function eur(cents: number) {
  return `${(cents / 100).toFixed(2)} €`;
}

export default function OrderConfirmationEmail({
  name,
  orderId,
  items,
  subtotal,
  shipping,
  total,
}: OrderConfirmationEmailProps) {
  return (
    <BaseLayout preview={`Confirmación de tu pedido #${orderId.slice(-8)}`}>
      <Text style={headingStyle}>Gracias por tu pedido, {name}</Text>
      <Text style={paragraphStyle}>
        Hemos recibido tu pago correctamente. Aquí tienes el resumen:
      </Text>

      <Section
        style={{
          backgroundColor: "#FAF6EE",
          borderRadius: 12,
          padding: 16,
          margin: "16px 0",
        }}
      >
        <Text style={{ ...paragraphStyle, fontSize: 13, color: "#9A8F7E", marginBottom: 8 }}>
          Pedido #{orderId.slice(-8)}
        </Text>
        {items.map((item, i) => (
          <Text key={i} style={{ ...paragraphStyle, fontSize: 14, margin: "4px 0" }}>
            <strong>{item.quantity}×</strong> {item.name} —{" "}
            <span style={{ color: "#2A2622" }}>{eur(item.unitPrice * item.quantity)}</span>
          </Text>
        ))}
        <Hr style={{ borderColor: "#E8E2D7", margin: "12px 0" }} />
        <Text style={{ ...paragraphStyle, fontSize: 14, margin: "4px 0" }}>
          Subtotal: {eur(subtotal)}
        </Text>
        <Text style={{ ...paragraphStyle, fontSize: 14, margin: "4px 0" }}>
          Envío: {eur(shipping)}
        </Text>
        <Text style={{ ...paragraphStyle, fontSize: 16, fontWeight: 600, color: "#2A2622" }}>
          Total: {eur(total)}
        </Text>
      </Section>

      <Section style={{ marginTop: 16 }}>
        <Button href={`${BASE_URL}/mi-cuenta/pedidos`} style={buttonStyle}>
          Ver mis pedidos
        </Button>
      </Section>
    </BaseLayout>
  );
}
