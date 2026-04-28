"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/lib/schemas/auth";

export default function RegistroPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterInput) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        toast.error(json.error ?? "Error al crear la cuenta.");
        return;
      }
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      toast.success("¡Cuenta creada! Bienvenida a Forma y Línea.");
      router.push("/mi-cuenta");
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.");
    }
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
        <div className="bg-[var(--bg-white)] rounded-2xl shadow-sm border border-[var(--line)] p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-[var(--text-strong)]">Crear cuenta</h1>
            <p className="text-body-sm text-[var(--text-soft)] mt-2">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-[var(--gold-700)] hover:underline font-medium">
                Inicia sesión
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="name">Nombre completo *</Label>
              <Input id="name" {...register("name")} placeholder="María García" className="mt-1" autoComplete="name" />
              {errors.name && <p className="text-xs text-[var(--danger)] mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register("email")} placeholder="tu@email.com" className="mt-1" autoComplete="email" />
              {errors.email && <p className="text-xs text-[var(--danger)] mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" {...register("phone")} placeholder="+34 600 000 000" className="mt-1" autoComplete="tel" />
            </div>
            <div>
              <Label htmlFor="password">Contraseña *</Label>
              <Input id="password" type="password" {...register("password")} placeholder="Mínimo 8 caracteres" className="mt-1" autoComplete="new-password" />
              {errors.password && <p className="text-xs text-[var(--danger)] mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
              <Input id="confirmPassword" type="password" {...register("confirmPassword")} placeholder="Repite la contraseña" className="mt-1" autoComplete="new-password" />
              {errors.confirmPassword && <p className="text-xs text-[var(--danger)] mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          <p className="text-xs text-[var(--text-mute)] text-center mt-6">
            Al registrarte aceptas nuestra{" "}
            <Link href="/politica-privacidad" className="underline">política de privacidad</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
