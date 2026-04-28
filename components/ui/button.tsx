import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-target",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--gold-500)] text-white hover:bg-[var(--gold-700)] hover:scale-[1.02] active:scale-[0.98] shadow-sm",
        destructive:
          "bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90 hover:scale-[1.02]",
        outline:
          "border border-[var(--gold-500)] text-[var(--gold-700)] bg-transparent hover:bg-[var(--gold-500)] hover:text-white hover:scale-[1.02]",
        "outline-white":
          "border border-white text-white bg-transparent hover:bg-white hover:text-[var(--text-strong)] hover:scale-[1.02]",
        secondary:
          "bg-[var(--bg-deep)] text-[var(--text-base)] hover:bg-[var(--line)] hover:scale-[1.02]",
        ghost:
          "text-[var(--text-base)] hover:bg-[var(--bg-deep)] hover:text-[var(--text-strong)]",
        link: "text-[var(--gold-700)] underline-offset-4 hover:underline p-0 h-auto",
        sage: "bg-[var(--sage-500)] text-white hover:bg-[var(--sage-700)] hover:scale-[1.02]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
