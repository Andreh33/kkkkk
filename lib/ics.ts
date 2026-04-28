interface ICSEventInput {
  title: string;
  description: string;
  location: string;
  startsAt: Date;
  endsAt: Date;
  uid: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatICSDate(d: Date) {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function escapeText(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function generateICS({ title, description, location, startsAt, endsAt, uid }: ICSEventInput) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Forma y Línea//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}@formaylinea.es`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(startsAt)}`,
    `DTEND:${formatICSDate(endsAt)}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}
