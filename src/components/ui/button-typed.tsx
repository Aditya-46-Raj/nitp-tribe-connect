// Re-export of Button component with explicit typing for TypeScript resolution
import { Button as OriginalButton, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, forwardRef } from "react";

// Explicitly define the props interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent" | "hero";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Re-export with explicit typing
export const Button = OriginalButton as typeof OriginalButton & {
  (props: ButtonProps): JSX.Element;
};

export { buttonVariants };
export type { ButtonProps };
