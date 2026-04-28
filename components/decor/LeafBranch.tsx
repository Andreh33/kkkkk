import { cn } from "@/lib/utils";

interface LeafBranchProps {
  className?: string;
  color?: "sage" | "gold";
}

export function LeafBranch({ className, color = "sage" }: LeafBranchProps) {
  const stroke = color === "gold" ? "var(--gold-500)" : "var(--sage-500)";
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
    >
      {/* Rama principal */}
      <path
        d="M10 70 Q45 40 110 15"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Hoja izquierda */}
      <path
        d="M30 58 Q20 40 40 38 Q38 55 30 58Z"
        stroke={stroke}
        strokeWidth="1.2"
        fill="none"
      />
      {/* Hoja central */}
      <path
        d="M60 42 Q48 26 66 22 Q68 38 60 42Z"
        stroke={stroke}
        strokeWidth="1.2"
        fill="none"
      />
      {/* Hoja derecha */}
      <path
        d="M90 26 Q80 12 96 10 Q100 24 90 26Z"
        stroke={stroke}
        strokeWidth="1.2"
        fill="none"
      />
      {/* Brotes pequeños */}
      <circle cx="48" cy="50" r="1.5" fill={stroke} opacity="0.6" />
      <circle cx="75" cy="34" r="1.5" fill={stroke} opacity="0.6" />
    </svg>
  );
}
