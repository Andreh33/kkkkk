"use client";

import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const COOKIE_NAME = "fyl_consent";

interface Consent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function writeConsent(c: Consent) {
  const value = encodeURIComponent(JSON.stringify(c));
  // 6 months
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setShow(true);
  }, []);

  function acceptAll() {
    writeConsent({ necessary: true, analytics: true, marketing: true, ts: Date.now() });
    setShow(false);
  }

  function rejectAll() {
    writeConsent({ necessary: true, analytics: false, marketing: false, ts: Date.now() });
    setShow(false);
  }

  function savePreferences() {
    writeConsent({ necessary: true, analytics, marketing, ts: Date.now() });
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-md sm:px-0 sm:pb-0"
    >
      <div className="bg-[var(--bg-white)] border border-[var(--line)] rounded-2xl shadow-xl p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 rounded-full bg-[var(--bg-cream)]">
            <Cookie className="h-5 w-5 text-[var(--gold-700)]" />
          </div>
          <div>
            <h2 className="font-medium text-[var(--text-strong)]">Cookies en formaylinea</h2>
            <p className="text-sm text-[var(--text-soft)] mt-1">
              Usamos cookies necesarias para el funcionamiento del sitio y, con tu permiso, otras
              para analítica y marketing. Más info en{" "}
              <a href="/politica-cookies" className="text-[var(--gold-700)] underline">
                Política de cookies
              </a>
              .
            </p>
          </div>
        </div>

        {showSettings && (
          <div className="space-y-2 my-4 text-sm border-t border-[var(--line)] pt-4">
            <label className="flex items-start gap-2">
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-[var(--gold-500)]" />
              <span>
                <strong className="text-[var(--text-strong)]">Necesarias</strong>
                <span className="block text-xs text-[var(--text-mute)]">
                  Sesión, carrito, seguridad. Siempre activas.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--gold-500)]"
              />
              <span>
                <strong className="text-[var(--text-strong)]">Analíticas</strong>
                <span className="block text-xs text-[var(--text-mute)]">
                  Estadísticas de uso anónimas.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--gold-500)]"
              />
              <span>
                <strong className="text-[var(--text-strong)]">Marketing</strong>
                <span className="block text-xs text-[var(--text-mute)]">
                  Anuncios personalizados y remarketing.
                </span>
              </span>
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <Button onClick={acceptAll} size="sm" className="flex-1">
            Aceptar todas
          </Button>
          {showSettings ? (
            <Button onClick={savePreferences} size="sm" variant="outline" className="flex-1">
              Guardar selección
            </Button>
          ) : (
            <Button onClick={() => setShowSettings(true)} size="sm" variant="outline" className="flex-1">
              Configurar
            </Button>
          )}
          <Button onClick={rejectAll} size="sm" variant="ghost">
            Rechazar
          </Button>
        </div>
      </div>
    </div>
  );
}
