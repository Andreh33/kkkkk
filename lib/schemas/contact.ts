import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nombre demasiado corto"),
  email: z.string().email("Email no válido"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type ContactInput = z.infer<typeof contactSchema>;
