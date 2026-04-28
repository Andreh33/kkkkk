"use client";

import { useState } from "react";
import { toast } from "sonner";

import { SmallSprig } from "@/components/decor/SmallSprig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success("¡Suscrito! Recibirás nuestros consejos cada mes.");
        setEmail("");
      } else {
        toast.error("Algo salió mal. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[var(--bg-cream)]">
      <div className="max-w-xl mx-auto text-center">
        <SmallSprig className="w-6 h-8 mb-4 mx-auto text-[var(--sage-500)]" />
        <h2 className="font-display text-display-sm text-[var(--text-strong)] mb-3">
          Consejos de <span className="text-accent-italic">belleza y bienestar</span>
        </h2>
        <p className="text-body-sm text-[var(--text-soft)] mb-8">
          Cada mes en tu correo, sin spam. Solo lo que realmente te interesa.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Correo electrónico para suscripción"
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Suscribiendo..." : "Suscribirme"}
          </Button>
        </form>
        <p className="text-xs text-[var(--text-mute)] mt-4">
          Puedes darte de baja en cualquier momento. Tu privacidad es importante.
        </p>
      </div>
    </section>
  );
}
