import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { EMAIL_ADMIN, getResend } from "@/lib/email";
import { contactSchema } from "@/lib/schemas/contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, phone, subject, message } = parsed.data;

    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });

    await getResend().emails.send({
      from: process.env.EMAIL_FROM ?? "Forma y Línea <hola@formaylinea.info>",
      to: EMAIL_ADMIN,
      subject: `Nuevo mensaje de contacto: ${subject ?? "Sin asunto"}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone ?? "-"}\nAsunto: ${subject ?? "-"}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
