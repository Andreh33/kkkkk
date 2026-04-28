import { cn } from "@/lib/utils";

interface LineDividerProps {
  className?: string;
  color?: "sage" | "gold";
}

export function LineDivider({ className, color = "gold" }: LineDividerProps) {
  const stroke = color === "gold" ? "var(--gold-500)" : "var(--sage-500)";
  const fill = color === "gold" ? "var(--gold-300)" : "var(--sage-300)";
  return (
    <div aria-hidden className={cn("flex items-center gap-3 my-6", className)}>
      <div className="flex-1 border-t" style={{ borderColor: stroke, opacity: 0.4 }} />
      <svg
        viewBox="0 0 60 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none select-none w-16 h-6 flex-shrink-0"
      >
        {/* Hoja izquierda */}
        <path
          d="M2 12 Q8 6 14 8 Q12 14 6 14 Z"
          stroke={stroke}
          strokeWidth="1.4"
          fill={fill}
          fillOpacity="0.4"
        />
        {/* Broche floral central */}
        <circle cx="30" cy="12" r="4.5" stroke={stroke} strokeWidth="1.6" fill={fill} fillOpacity="0.4" />
        <path d="M30 5 Q34 9 30 12 Q26 9 30 5Z" stroke={stroke} strokeWidth="1.3" fill={fill} fillOpacity="0.5" />
        <path d="M22 12 Q26 16 30 12 Q26 8 22 12Z" stroke={stroke} strokeWidth="1.3" fill={fill} fillOpacity="0.5" />
        <path d="M38 12 Q34 16 30 12 Q34 8 38 12Z" stroke={stroke} strokeWidth="1.3" fill={fill} fillOpacity="0.5" />
        <path d="M30 19 Q26 16 30 12 Q34 16 30 19Z" stroke={stroke} strokeWidth="1.3" fill={fill} fillOpacity="0.5" />
        <circle cx="30" cy="12" r="1.6" fill={stroke} />
        {/* Hoja derecha */}
        <path
          d="M58 12 Q52 6 46 8 Q48 14 54 14 Z"
          stroke={stroke}
          strokeWidth="1.4"
          fill={fill}
          fillOpacity="0.4"
        />
      </svg>
      <div className="flex-1 border-t" style={{ borderColor: stroke, opacity: 0.4 }} />
    </div>
  );
}
