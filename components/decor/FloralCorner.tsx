import { cn } from "@/lib/utils";

interface FloralCornerProps {
  className?: string;
  color?: "sage" | "gold";
  flip?: boolean;
}

export function FloralCorner({ className, color = "sage", flip = false }: FloralCornerProps) {
  const stroke = color === "gold" ? "var(--gold-500)" : "var(--sage-500)";
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
      <path d="M5 85 Q5 5 85 5" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 55 Q18 30 40 22" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
      {/* Flor esquina */}
      <circle cx="18" cy="72" r="3" stroke={stroke} strokeWidth="1.2" />
      <path d="M18 65 Q22 68 18 72 Q14 68 18 65Z" stroke={stroke} strokeWidth="1" fill="none" />
      <path d="M11 72 Q14 76 18 72 Q14 68 11 72Z" stroke={stroke} strokeWidth="1" fill="none" />
      <path d="M25 72 Q22 76 18 72 Q22 68 25 72Z" stroke={stroke} strokeWidth="1" fill="none" />
      <path d="M18 79 Q14 76 18 72 Q22 76 18 79Z" stroke={stroke} strokeWidth="1" fill="none" />
      {/* Hoja lateral */}
      <path
        d="M30 60 Q20 48 35 44 Q38 56 30 60Z"
        stroke={stroke}
        strokeWidth="1.1"
        fill="none"
      />
    </svg>
  );
}
