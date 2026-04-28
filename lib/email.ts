import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  }
  return _resend;
}

export const EMAIL_FROM = process.env.EMAIL_FROM ?? "Forma y Línea <hola@formaylinea.info>";
export const EMAIL_ADMIN = process.env.EMAIL_ADMIN ?? "info@formaylinea.info";
