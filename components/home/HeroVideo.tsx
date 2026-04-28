"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

// Vídeo de fondo (stock libre de Pexels — sustituir por grabación profesional del centro)
const VIDEO_MP4 =
  "https://videos.pexels.com/video-files/3997798/3997798-uhd_2560_1440_25fps.mp4";
const POSTER =
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80";

export function HeroVideo() {
  const prefersReducedMotion = useReducedMotion();
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) setSaveData(true);
  }, []);

  const showVideo = !prefersReducedMotion && !saveData;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Fondo vídeo o imagen */}
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            className="w-full h-full object-cover"
            aria-hidden
          >
            <source src={VIDEO_MP4} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={POSTER}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" aria-hidden />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--gold-300)] text-xs sm:text-sm tracking-[0.3em] uppercase font-body font-medium mb-4"
        >
          Bienestar · Estética · Tradición
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-white text-display-xl mb-6"
        >
          Tu{" "}
          <span className="text-accent-italic" style={{ color: "var(--gold-300)" }}>
            belleza
          </span>
          , en las mejores manos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-white/85 text-body-lg font-body mb-10 max-w-xl mx-auto"
        >
          Más de 35 años cuidando de ti en Ciudad Real
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="text-base">
            <Link href="/servicios/masajes">Reservar una cita</Link>
          </Button>
          <Button asChild size="lg" variant="outline-white" className="text-base">
            <Link href="/servicios">Ver tratamientos</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/60 h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
