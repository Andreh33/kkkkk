"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/schemas/auth";

export default function RecuperarPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSent(true);
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.");
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-cream)]">
        <div className="max-w-md w-full text-center bg-[var(--bg-white)] rounded-2xl border border-[var(--line)] p-8">
          <h1 className="font-display text-2xl text-[var(--text-strong)] mb-3">
            Revisa tu correo
          </h1>
          <p className="text-body-sm text-[var(--text-soft)] mb-6">
            Si el email está registrado, recibirás un enlace para restablecer tu contraseña en los
            próximos minutos. El enlace expira en 30 minutos.
          </p>
          <Link href="/login" className="text-sm text-[var(--gold-700)] hover:underline">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-cream)] py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-soft)] hover:text-[var(--gold-700)] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a la web
        </Link>
        <div className="bg-[var(--bg-white)] rounded-2xl border border-[var(--line)] p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-[var(--text-strong)]">
              Recuperar contraseña
            </h1>
            <p className="text-body-sm text-[var(--text-soft)] mt-2">
              Escribe tu email y te enviaremos un enlace para restablecerla.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} placeholder="tu@email.com" className="mt-1" autoComplete="email" />
              {errors.email && <p className="text-xs text-[var(--danger)] mt-1">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar enlace"}
            </Button>
            <div className="text-center">
              <Link href="/login" className="text-sm text-[var(--gold-700)] hover:underline">
                Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
