import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { SHIPPING, SITE } from "@/lib/constants";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["product", "service"]),
      name: z.string(),
      price: z.number().int().positive(),
      quantity: z.number().int().positive(),
      variant: z.string().optional(),
      productId: z.string().optional(),
      serviceId: z.string().optional(),
      slug: z.string(),
    })
  ).min(1),
  addressId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { items, addressId } = parsed.data;
    const hasPhysical = items.some((i) => i.type === "product");
    const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const shipping = hasPhysical && subtotal < SHIPPING.free ? SHIPPING.standard : 0;
    const total = subtotal + shipping;

    let shippingAddress = null;
    if (hasPhysical && addressId) {
      const addr = await prisma.address.findFirst({
        where: { id: addressId, userId: session.user.id },
      });
      if (addr) shippingAddress = addr;
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        subtotal,
        shipping,
        total,
        status: "PENDING",
        shippingAddress: shippingAddress ? JSON.parse(JSON.stringify(shippingAddress)) : null,
        items: {
          create: items.map((i) => ({
            name: i.name,
            unitPrice: i.price,
            quantity: i.quantity,
            variant: i.variant,
            productId: i.productId ?? null,
            serviceId: i.serviceId ?? null,
          })),
        },
      },
    });

    const stripeSession = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.variant ? `${item.name} — ${item.variant}` : item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      ...(shipping > 0
        ? {
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: shipping, currency: "eur" },
                  display_name: "Envío estándar (48-72h)",
                },
              },
            ],
          }
        : {}),
      metadata: {
        orderId: order.id,
        userId: session.user.id,
      },
      success_url: `${SITE.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/checkout/cancel`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: stripeSession.id },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Error al crear la sesión de pago." }, { status: 500 });
  }
}
