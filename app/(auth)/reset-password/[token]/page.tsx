"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/schemas/auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordInput) {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });
      if (res.ok) {
        toast.success("Contraseña actualizada. Ya puedes iniciar sesión.");
        router.push("/login");
      } else {
        const json = await res.json();
        toast.error(json.error ?? "El enlace no es válido o ha expirado.");
      }
    } catch {
      toast.error("Error de conexión.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-cream)]">
      <div className="w-full max-w-md">
        <div className="bg-[var(--bg-white)] rounded-2xl border border-[var(--line)] p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-[var(--text-strong)]">Nueva contraseña</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="password">Nueva contraseña</Label>
              <Input id="password" type="password" {...register("password")} placeholder="Mínimo 8 caracteres" className="mt-1" autoComplete="new-password" />
              {errors.password && <p className="text-xs text-[var(--danger)] mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input id="confirmPassword" type="password" {...register("confirmPassword")} placeholder="Repite la contraseña" className="mt-1" autoComplete="new-password" />
              {errors.confirmPassword && <p className="text-xs text-[var(--danger)] mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
