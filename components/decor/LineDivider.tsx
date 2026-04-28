import { cn } from "@/lib/utils";

interface LineDividerProps {
  className?: string;
  color?: "sage" | "gold";
}

export function LineDivider({ className, color = "gold" }: LineDividerProps) {
  const stroke = color === "gold" ? "var(--gold-500)" : "var(--sage-500)";
  return (
    <div aria-hidden className={cn("flex items-center gap-3 my-6", className)}>
      <div className="flex-1 border-t" style={{ borderColor: "var(--line)" }} />
      <svg
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none select-none w-10 h-5 flex-shrink-0"
      >
        {/* Broche floral central */}
        <circle cx="20" cy="10" r="3.5" stroke={stroke} strokeWidth="1.2" />
        <path d="M20 4 Q23 7 20 10 Q17 7 20 4Z" stroke={stroke} strokeWidth="1" fill="none" />
        <path d="M14 10 Q17 13 20 10 Q17 7 14 10Z" stroke={stroke} strokeWidth="1" fill="none" />
        <path d="M26 10 Q23 13 20 10 Q23 7 26 10Z" stroke={stroke} strokeWidth="1" fill="none" />
        <path d="M20 16 Q17 13 20 10 Q23 13 20 16Z" stroke={stroke} strokeWidth="1" fill="none" />
        <circle cx="20" cy="10" r="1.2" fill={stroke} />
        {/* Puntos decorativos */}
        <circle cx="8" cy="10" r="1" fill={stroke} opacity="0.5" />
        <circle cx="32" cy="10" r="1" fill={stroke} opacity="0.5" />
      </svg>
      <div className="flex-1 border-t" style={{ borderColor: "var(--line)" }} />
    </div>
  );
}
