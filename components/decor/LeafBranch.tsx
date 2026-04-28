import { cn } from "@/lib/utils";

interface LeafBranchProps {
  className?: string;
  color?: "sage" | "gold";
}

export function LeafBranch({ className, color = "sage" }: LeafBranchProps) {
  const stroke = color === "gold" ? "var(--gold-500)" : "var(--sage-500)";
  const fill = color === "gold" ? "var(--gold-300)" : "var(--sage-300)";
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
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Hoja izquierda */}
      <path
        d="M30 58 Q20 40 40 38 Q38 55 30 58Z"
        stroke={stroke}
        strokeWidth="1.8"
        fill={fill}
        fillOpacity="0.35"
      />
      <path d="M30 58 L36 44" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      {/* Hoja central */}
      <path
        d="M60 42 Q48 26 66 22 Q68 38 60 42Z"
        stroke={stroke}
        strokeWidth="1.8"
        fill={fill}
        fillOpacity="0.35"
      />
      <path d="M60 42 L62 28" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      {/* Hoja derecha */}
      <path
        d="M90 26 Q80 12 96 10 Q100 24 90 26Z"
        stroke={stroke}
        strokeWidth="1.8"
        fill={fill}
        fillOpacity="0.35"
      />
      <path d="M90 26 L93 14" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      {/* Brotes pequeños */}
      <circle cx="48" cy="50" r="2" fill={stroke} />
      <circle cx="75" cy="34" r="2" fill={stroke} />
      <circle cx="100" cy="20" r="1.6" fill={stroke} opacity="0.7" />
    </svg>
  );
}
