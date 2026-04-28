import { cn } from "@/lib/utils";

interface SmallSprigProps {
  className?: string;
  color?: "sage" | "gold";
}

export function SmallSprig({ className, color = "sage" }: SmallSprigProps) {
  const stroke = color === "gold" ? "var(--gold-500)" : "var(--sage-500)";
  const fill = color === "gold" ? "var(--gold-300)" : "var(--sage-300)";
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none inline-block", className)}
    >
      <path d="M12 30 L12 6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M12 22 Q5 17 7 11 Q14 16 12 22Z"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
        fillOpacity="0.5"
      />
      <path
        d="M12 14 Q19 9 17 3 Q10 8 12 14Z"
        stroke={stroke}
        strokeWidth="1.5"
        fill={fill}
        fillOpacity="0.5"
      />
      <circle cx="12" cy="3" r="1.6" fill={stroke} />
    </svg>
  );
}
