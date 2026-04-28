import { cn } from "@/lib/utils";

interface SmallSprigProps {
  className?: string;
  color?: "sage" | "gold";
}

export function SmallSprig({ className, color = "sage" }: SmallSprigProps) {
  const stroke = color === "gold" ? "var(--gold-500)" : "var(--sage-500)";
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none inline-block", className)}
    >
      <path d="M12 30 L12 8" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 22 Q6 18 8 12 Q14 16 12 22Z" stroke={stroke} strokeWidth="1.1" fill="none" />
      <path d="M12 14 Q18 10 16 4 Q10 8 12 14Z" stroke={stroke} strokeWidth="1.1" fill="none" />
    </svg>
  );
}
