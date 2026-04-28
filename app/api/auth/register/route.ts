import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import WelcomeEmail from "@/emails/WelcomeEmail";
import { prisma } from "@/lib/db";
import { EMAIL_FROM, getResend } from "@/lib/email";
import { registerSchema } from "@/lib/schemas/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, phone, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Ese email ya está registrado." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { name, email, phone, passwordHash },
    });

    if (process.env.RESEND_API_KEY) {
      try {
        await getResend().emails.send({
          from: EMAIL_FROM,
          to: email,
          subject: `¡Bienvenida a Forma y Línea, ${name}!`,
          react: WelcomeEmail({ name }),
        });
      } catch (e) {
        console.error("Welcome email failed:", e);
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
