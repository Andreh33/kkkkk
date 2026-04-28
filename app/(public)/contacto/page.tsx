"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LineDivider } from "@/components/decor/LineDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT, HOURS } from "@/lib/constants";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";

export default function ContactoPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Mensaje enviado. Te responderemos pronto.");
        reset();
      } else {
        toast.error("Algo salió mal. Inténtalo de nuevo.");
      }
    } catch {
      toast.error("Error de conexión. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[var(--bg-deep)] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Estamos aquí
          </p>
          <h1 className="font-display text-display-lg text-[var(--text-strong)]">Contacto</h1>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--bg-white)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Formulario */}
          <div>
            <h2 className="font-display text-2xl text-[var(--text-strong)] mb-6">
              Envíanos un mensaje
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Tu nombre completo"
                  className="mt-1"
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-[var(--danger)] mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="tu@email.com"
                  className="mt-1"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-[var(--danger)] mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+34 600 000 000"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="¿En qué podemos ayudarte?"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Cuéntanos qué necesitas..."
                  className="mt-1"
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-[var(--danger)] mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="font-display text-2xl text-[var(--text-strong)] mb-6">
              Información del centro
            </h2>
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-[var(--gold-500)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--text-base)] mb-0.5">Dirección</p>
                  <p className="text-[var(--text-soft)]">{CONTACT.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="h-5 w-5 text-[var(--gold-500)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--text-base)] mb-0.5">Teléfonos</p>
                  <a href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`} className="block text-[var(--text-soft)] hover:text-[var(--gold-700)] transition-colors">
                    {CONTACT.phone1}
                  </a>
                  <a href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`} className="block text-[var(--text-soft)] hover:text-[var(--gold-700)] transition-colors">
                    {CONTACT.phone2}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="h-5 w-5 text-[var(--gold-500)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--text-base)] mb-0.5">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="text-[var(--text-soft)] hover:text-[var(--gold-700)] transition-colors">
                    {CONTACT.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="h-5 w-5 text-[var(--gold-500)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--text-base)] mb-0.5">Horarios</p>
                  <p className="text-[var(--text-soft)]">{HOURS.weekdays.label}</p>
                  <p className="text-[var(--text-soft)]">{HOURS.saturday.label}</p>
                  <p className="text-[var(--text-soft)]">Domingos cerrado</p>
                </div>
              </div>
            </div>

            <LineDivider color="gold" />

            {/* Redes */}
            <div className="mt-6">
              <p className="font-medium text-[var(--text-base)] mb-4">Síguenos</p>
              <div className="flex gap-3">
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 border border-[var(--line)] rounded-full text-[var(--text-soft)] hover:border-[var(--gold-500)] hover:text-[var(--gold-700)] transition-colors touch-target flex items-center justify-center">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-3 border border-[var(--line)] rounded-full text-[var(--text-soft)] hover:border-[var(--gold-500)] hover:text-[var(--gold-700)] transition-colors touch-target flex items-center justify-center">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-3 border border-[var(--line)] rounded-full text-[var(--text-soft)] hover:border-[var(--gold-500)] hover:text-[var(--gold-700)] transition-colors touch-target flex items-center justify-center">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-8 rounded-xl overflow-hidden border border-[var(--line)] aspect-video">
              <iframe
                title="Ubicación de Forma y Línea Ciudad Real"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.5!2d-3.9285!3d38.9859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6a54e7f1f1f1f1%3A0x0!2sPasaje+Dulcinea+del+Toboso+3%2C+13001+Ciudad+Real!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
