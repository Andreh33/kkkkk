import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { CONTACT, HOURS } from "@/lib/constants";

export function MapSection() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[var(--bg-white)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Datos de contacto */}
          <div>
            <p className="text-[var(--gold-700)] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Encuéntranos
            </p>
            <h2 className="font-display text-display-sm text-[var(--text-strong)] mb-8">
              Visítanos en <span className="text-accent-italic">Ciudad Real</span>
            </h2>
            <div className="space-y-6">
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
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="rounded-2xl overflow-hidden border border-[var(--line)] aspect-video lg:aspect-square">
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
  );
}
