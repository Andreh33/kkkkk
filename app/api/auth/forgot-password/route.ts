import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { getResend, EMAIL_FROM } from "@/lib/email";
import { forgotPasswordSchema } from "@/lib/schemas/auth";
import { SITE } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: true }); // No revelar si el email existe
    }

    const { email } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 min

      await prisma.passwordResetToken.create({
        data: { userId: user.id, token, expiresAt },
      });

      const resetUrl = `${SITE.url}/reset-password/${token}`;

      await getResend().emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: "Restablece tu contraseña — Forma y Línea",
        text: `Hola ${user.name},\n\nHaz clic en el siguiente enlace para restablecer tu contraseña:\n${resetUrl}\n\nEste enlace expira en 30 minutos.\n\nSi no solicitaste este cambio, ignora este correo.\n\nForma y Línea Ciudad Real`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ ok: true }); // Siempre 200 para no revelar info
  }
}
