"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut, getSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/schemas/auth";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error === "forbidden") {
      toast.error("Esa cuenta no tiene permisos de administrador.");
    }
    getSession().then((s) => {
      if (s?.user?.role === "ADMIN") {
        router.replace(callbackUrl.startsWith("/admin") ? callbackUrl : "/admin");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      if (!res?.ok) {
        toast.error("Credenciales incorrectas.");
        setLoading(false);
        return;
      }

      const session = await getSession();
      if (session?.user?.role !== "ADMIN") {
        await signOut({ redirect: false });
        toast.error("Esta cuenta no tiene permisos de administración.");
        setLoading(false);
        return;
      }

      toast.success("Acceso autorizado");
      router.push(callbackUrl.startsWith("/admin") ? callbackUrl : "/admin");
      router.refresh();
    } catch {
      toast.error("Error de conexión.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#1a1816] rounded-2xl border border-[#3a342c] p-8 shadow-2xl">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/logo/logo-forma-linea-1920x1080-1.png"
          alt="Forma y Línea"
          width={140}
          height={40}
          className="h-9 w-auto object-contain brightness-0 invert mb-4"
        />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a342c] border border-[var(--gold-700)]/40">
          <Lock className="h-3 w-3 text-[var(--gold-300)]" />
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-[var(--gold-300)]">
            Acceso restringido
          </span>
        </div>
        <h1 className="font-display text-3xl text-white mt-4">Panel de administración</h1>
        <p className="text-sm text-[#a8a094] mt-1">Solo personal autorizado</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <Label htmlFor="email" className="text-[#d4ccbc]">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="admin@formaylinea.info"
            className="mt-1 bg-[#0f0e0c] border-[#3a342c] text-white placeholder:text-[#6b6358]"
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-[var(--danger)] mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password" className="text-[#d4ccbc]">Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="••••••••"
            className="mt-1 bg-[#0f0e0c] border-[#3a342c] text-white"
            autoComplete="current-password"
          />
          {errors.password && <p className="text-xs text-[var(--danger)] mt-1">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verificando…" : "Entrar al panel"}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-[#3a342c] text-center">
        <p className="text-xs text-[#6b6358]">
          ¿Eres cliente?{" "}
          <Link href="/login" className="text-[var(--gold-300)] hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#0f0e0c] via-[#1a1816] to-[#0f0e0c]">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#a8a094] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a la web
        </Link>
        <Suspense>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
