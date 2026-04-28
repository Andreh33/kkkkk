export const SITE = {
  name: "Forma y Línea Ciudad Real",
  tagline: "Tu belleza, en las mejores manos",
  description:
    "Centro de medicina estética, masajes y belleza en Ciudad Real. Más de 35 años cuidando de ti.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "info@formaylinea.info",
  emailFrom: process.env.EMAIL_FROM ?? "Forma y Línea <hola@formaylinea.info>",
} as const;

export const CONTACT = {
  address: "Pasaje Dulcinea del Toboso 3, 13001 Ciudad Real",
  phone1: "(+34) 926 253 454",
  phone2: "(+34) 664 649 181",
  email: "info@formaylinea.info",
  instagram: "https://www.instagram.com/formaylineaciudadreal",
  facebook: "https://www.facebook.com/formaylinea.ciudadreal",
  youtube: "https://www.youtube.com/channel/UCm7W7bqlyZha4HmynNGYqaQ/featured",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.0!2d-3.9285!3d38.9859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPasaje+Dulcinea+del+Toboso+3%2C+Ciudad+Real!5e0!3m2!1ses!2ses!4v1",
} as const;

export const HOURS = {
  weekdays: { open: "09:00", close: "20:00", label: "Lunes a Viernes 9:00 — 20:00" },
  saturday: { open: "09:00", close: "14:00", label: "Sábados 9:00 — 14:00" },
  sunday: null,
} as const;

/** Horario en formato 24h para cada día de la semana (0=domingo) */
export const SCHEDULE: Record<number, { open: string; close: string } | null> = {
  0: null,
  1: { open: "09:00", close: "20:00" },
  2: { open: "09:00", close: "20:00" },
  3: { open: "09:00", close: "20:00" },
  4: { open: "09:00", close: "20:00" },
  5: { open: "09:00", close: "20:00" },
  6: { open: "09:00", close: "14:00" },
};

export const BOOKING = {
  bufferMinutes: 15,
  minAdvanceHours: 12,
  maxAdvanceDays: 90,
  slotIntervalMinutes: 30,
} as const;

export const SHIPPING = {
  free: 5000, // céntimos — envío gratis a partir de 50 €
  standard: 395, // 3,95 €
} as const;
