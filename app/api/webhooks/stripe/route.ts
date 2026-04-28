import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";
import { prisma } from "@/lib/db";
import { EMAIL_FROM, getResend } from "@/lib/email";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency check
  const existing = await prisma.webhookEvent.findUnique({
    where: { stripeEventId: event.id },
  });
  if (existing?.processed) {
    return NextResponse.json({ ok: true });
  }

  await prisma.webhookEvent.upsert({
    where: { stripeEventId: event.id },
    update: {},
    create: { stripeEventId: event.id },
  });

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { orderId, userId } = session.metadata ?? {};
        if (!orderId || !userId) break;

        const order = await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            stripePaymentId: session.payment_intent as string,
          },
          include: { items: true },
        });

        // Descontar stock de productos
        for (const item of order.items) {
          if (item.productId) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            });
          }
        }

        // Crear ServiceCredits para servicios
        for (const item of order.items) {
          if (item.serviceId) {
            for (let q = 0; q < item.quantity; q++) {
              await prisma.serviceCredit.create({
                data: {
                  userId,
                  serviceId: item.serviceId,
                  orderId: order.id,
                  redeemed: false,
                },
              });
            }
          }
        }

        // Email de confirmación
        if (process.env.RESEND_API_KEY) {
          const user = await prisma.user.findUnique({ where: { id: userId } });
          if (user?.email) {
            try {
              await getResend().emails.send({
                from: EMAIL_FROM,
                to: user.email,
                subject: `Confirmación de tu pedido #${order.id.slice(-8)}`,
                react: OrderConfirmationEmail({
                  name: user.name ?? "",
                  orderId: order.id,
                  items: order.items.map((i) => ({
                    name: i.name,
                    quantity: i.quantity,
                    unitPrice: i.unitPrice,
                  })),
                  subtotal: order.subtotal,
                  shipping: order.shipping,
                  total: order.total,
                }),
              });
            } catch (e) {
              console.error("Order email failed:", e);
            }
          }
        }
        break;
      }

      case "checkout.session.expired":
      case "payment_intent.payment_failed": {
        const obj = event.data.object as { metadata?: { orderId?: string } };
        const orderId = obj.metadata?.orderId;
        if (orderId) {
          await prisma.order.updateMany({
            where: { id: orderId, status: "PENDING" },
            data: { status: "FAILED" },
          });
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId = charge.payment_intent as string;
        if (paymentIntentId) {
          const order = await prisma.order.findFirst({
            where: { stripePaymentId: paymentIntentId },
          });
          if (order) {
            await prisma.order.update({
              where: { id: order.id },
              data: { status: "REFUNDED" },
            });
            // Anular créditos no canjeados
            await prisma.serviceCredit.updateMany({
              where: { orderId: order.id, redeemed: false },
              data: { redeemed: true },
            });
          }
        }
        break;
      }
    }

    await prisma.webhookEvent.update({
      where: { stripeEventId: event.id },
      data: { processed: true },
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
