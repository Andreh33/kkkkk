import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LineDivider } from "@/components/decor/LineDivider";
import { CONTACT, HOURS, SITE } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--text-strong)] text-[var(--bg-deep)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + descripción */}
          <div className="lg:col-span-1">
            <Image
              src="/logo/logo-forma-linea-1920x1080-1.png"
              alt="Forma y Línea Ciudad Real"
              width={150}
              height={42}
              className="h-10 w-auto object-contain brightness-0 invert mb-4"
            />
            <p className="text-sm text-[var(--text-mute)] leading-relaxed">
              Centro de medicina estética, masajes y belleza en Ciudad Real. Más de 35 años
              cuidando de ti.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3 mt-6">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Forma y Línea"
                className="p-2 rounded-full border border-[var(--text-soft)] text-[var(--text-soft)] hover:border-[var(--gold-500)] hover:text-[var(--gold-500)] transition-colors touch-target flex items-center justify-center"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Forma y Línea"
                className="p-2 rounded-full border border-[var(--text-soft)] text-[var(--text-soft)] hover:border-[var(--gold-500)] hover:text-[var(--gold-500)] transition-colors touch-target flex items-center justify-center"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube de Forma y Línea"
                className="p-2 rounded-full border border-[var(--text-soft)] text-[var(--text-soft)] hover:border-[var(--gold-500)] hover:text-[var(--gold-500)] transition-colors touch-target flex items-center justify-center"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--gold-300)] uppercase tracking-widest mb-4">
              Servicios
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/servicios/masajes", label: "Masajes" },
                { href: "/servicios/medicina-estetica", label: "Medicina Estética" },
                { href: "/servicios/tratamientos-faciales", label: "Tratamientos Faciales" },
                { href: "/servicios/tratamientos-corporales", label: "Tratamientos Corporales" },
                { href: "/tienda", label: "Tienda" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-300)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--gold-300)] uppercase tracking-widest mb-4">
              Centro
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/quien-soy", label: "Quién soy" },
                { href: "/blog", label: "Blog" },
                { href: "/contacto", label: "Contacto" },
                { href: "/aviso-legal", label: "Aviso legal" },
                { href: "/politica-privacidad", label: "Política de privacidad" },
                { href: "/politica-cookies", label: "Política de cookies" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-300)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--gold-300)] uppercase tracking-widest mb-4">
              Contacto
            </h3>
            <address className="not-italic space-y-3">
              <p className="text-sm text-[var(--text-mute)]">{CONTACT.address}</p>
              <div>
                <a
                  href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
                  className="block text-sm text-[var(--text-mute)] hover:text-[var(--gold-300)] transition-colors"
                >
                  {CONTACT.phone1}
                </a>
                <a
                  href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
                  className="block text-sm text-[var(--text-mute)] hover:text-[var(--gold-300)] transition-colors"
                >
                  {CONTACT.phone2}
                </a>
              </div>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm text-[var(--text-mute)] hover:text-[var(--gold-300)] transition-colors"
              >
                {CONTACT.email}
              </a>
              <div className="text-sm text-[var(--text-mute)]">
                <p>{HOURS.weekdays.label}</p>
                <p>{HOURS.saturday.label}</p>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-[var(--text-soft)]/20 pt-8">
          <p className="text-xs text-[var(--text-mute)] text-center">
            © {currentYear} {SITE.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
