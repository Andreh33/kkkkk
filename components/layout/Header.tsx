"use client";

import { Menu, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/stores/cart";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/quien-soy", label: "Quién soy" },
  {
    href: "/servicios",
    label: "Servicios",
    children: [
      { href: "/servicios/masajes", label: "Masajes" },
      { href: "/servicios/medicina-estetica", label: "Medicina Estética" },
      { href: "/servicios/tratamientos-faciales", label: "Faciales" },
      { href: "/servicios/tratamientos-corporales", label: "Corporales" },
    ],
  },
  { href: "/tienda", label: "Tienda" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[var(--bg-white)]/95 backdrop-blur-md shadow-sm border-b border-[var(--line)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Forma y Línea — Inicio">
          <Image
            src="/logo/logo-forma-linea-1920x1080-1.png"
            alt="Forma y Línea Ciudad Real"
            width={160}
            height={45}
            className={cn(
              "h-10 md:h-14 w-auto object-contain transition-all duration-300",
              !scrolled && "brightness-0 invert"
            )}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-200",
                  scrolled
                    ? "text-[var(--text-base)] hover:text-[var(--gold-700)]"
                    : "text-white hover:text-[var(--gold-300)]"
                )}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="absolute top-full left-0 pt-3 hidden group-hover:block">
                  <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-lg shadow-lg py-2 min-w-[180px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-[var(--text-base)] hover:text-[var(--gold-700)] hover:bg-[var(--bg-cream)] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/mi-cuenta"
            aria-label="Mi cuenta"
            className={cn(
              "p-2 rounded-full transition-colors duration-200 touch-target flex items-center justify-center",
              scrolled
                ? "text-[var(--text-base)] hover:text-[var(--gold-700)] hover:bg-[var(--bg-deep)]"
                : "text-white hover:text-[var(--gold-300)]"
            )}
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/carrito"
            aria-label={`Carrito (${cartCount} productos)`}
            className={cn(
              "relative p-2 rounded-full transition-colors duration-200 touch-target flex items-center justify-center",
              scrolled
                ? "text-[var(--text-base)] hover:text-[var(--gold-700)] hover:bg-[var(--bg-deep)]"
                : "text-white hover:text-[var(--gold-300)]"
            )}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[var(--gold-500)] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "lg:hidden p-2 rounded-full touch-target flex items-center justify-center transition-colors",
                  scrolled
                    ? "text-[var(--text-base)] hover:bg-[var(--bg-deep)]"
                    : "text-white hover:text-[var(--gold-300)]"
                )}
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 pt-12">
              <nav aria-label="Menú móvil" className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-[var(--text-base)] hover:text-[var(--gold-700)] hover:bg-[var(--bg-cream)] rounded-md transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4 border-l-2 border-[var(--line)] ml-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-[var(--text-soft)] hover:text-[var(--gold-700)] transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-[var(--line)]">
                  <Link
                    href="/mi-cuenta"
                    className="block px-4 py-3 text-base font-medium text-[var(--text-base)] hover:text-[var(--gold-700)] rounded-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Mi cuenta
                  </Link>
                  <Link
                    href="/carrito"
                    className="block px-4 py-3 text-base font-medium text-[var(--text-base)] hover:text-[var(--gold-700)] rounded-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Carrito {cartCount > 0 && `(${cartCount})`}
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
