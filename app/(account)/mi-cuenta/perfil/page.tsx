"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  name: z.string().min(2, "Nombre demasiado corto"),
  phone: z.string().optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

export default function PerfilPage() {
  const { data: session } = useSession();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
    },
  });

  async function onSubmit(data: ProfileInput) {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Perfil actualizado correctamente.");
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl text-[var(--text-strong)]">Mi perfil</h1>
      <div className="bg-[var(--bg-white)] rounded-xl border border-[var(--line)] p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" {...register("name")} className="mt-1" />
            {errors.name && <p className="text-xs text-[var(--danger)] mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={session?.user?.email ?? ""} disabled className="mt-1 opacity-60" />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" type="tel" {...register("phone")} className="mt-1" />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </div>
    </div>
  );
}
