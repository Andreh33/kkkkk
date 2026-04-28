"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/schemas/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/mi-cuenta";
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginInput) {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("¡Bienvenida!");
        router.push(callbackUrl);
        router.refresh();
      } else {
        toast.error("Email o contraseña incorrectos.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[var(--bg-white)] rounded-2xl shadow-sm border border-[var(--line)] p-8">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl text-[var(--text-strong)]">Iniciar sesión</h1>
        <p className="text-body-sm text-[var(--text-soft)] mt-2">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/registro" className="text-[var(--gold-700)] hover:underline font-medium">
            Regístrate
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="tu@email.com"
            className="mt-1"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-xs text-[var(--danger)] mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              href="/recuperar-password"
              className="text-xs text-[var(--gold-700)] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-xs text-[var(--danger)] mt-1">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-cream)]">
      <div className="w-full max-w-md">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
