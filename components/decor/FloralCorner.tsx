import { cn } from "@/lib/utils";

interface FloralCornerProps {
  className?: string;
  color?: "sage" | "gold";
  flip?: boolean;
}

export function FloralCorner({ className, color = "sage", flip = false }: FloralCornerProps) {
  const stroke = color === "gold" ? "var(--gold-500)" : "var(--sage-500)";
  const fill = color === "gold" ? "var(--gold-300)" : "var(--sage-300)";
  return (
    <svg
      aria-hidden
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none select-none",
        flip && "scale-x-[-1]",
        className
      )}
    >
      {/* Curva principal */}
      <path d="M5 85 Q5 5 85 5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 55 Q18 30 40 22" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 70 Q12 55 28 50" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      {/* Flor esquina (rellena) */}
      <circle cx="18" cy="72" r="4" stroke={stroke} strokeWidth="1.6" fill={fill} fillOpacity="0.4" />
      <path d="M18 64 Q23 68 18 72 Q13 68 18 64Z" stroke={stroke} strokeWidth="1.4" fill={fill} fillOpacity="0.5" />
      <path d="M10 72 Q14 77 18 72 Q14 67 10 72Z" stroke={stroke} strokeWidth="1.4" fill={fill} fillOpacity="0.5" />
      <path d="M26 72 Q22 77 18 72 Q22 67 26 72Z" stroke={stroke} strokeWidth="1.4" fill={fill} fillOpacity="0.5" />
      <path d="M18 80 Q13 76 18 72 Q23 76 18 80Z" stroke={stroke} strokeWidth="1.4" fill={fill} fillOpacity="0.5" />
      <circle cx="18" cy="72" r="1.5" fill={stroke} />
      {/* Hoja lateral */}
      <path
        d="M30 60 Q20 48 35 44 Q38 56 30 60Z"
        stroke={stroke}
        strokeWidth="1.6"
        fill={fill}
        fillOpacity="0.35"
      />
      <path d="M30 60 L34 50" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      {/* Hoja superior */}
      <path
        d="M48 18 Q42 8 55 5 Q58 14 48 18Z"
        stroke={stroke}
        strokeWidth="1.6"
        fill={fill}
        fillOpacity="0.35"
      />
      {/* Brotes */}
      <circle cx="62" cy="14" r="1.6" fill={stroke} />
      <circle cx="42" cy="32" r="1.4" fill={stroke} opacity="0.7" />
    </svg>
  );
}
