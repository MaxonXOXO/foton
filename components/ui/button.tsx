import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "glass";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl transition hover-lift";
    const styles = variant === "outline"
      ? "glass text-gray-800 hover:bg-white/20"
      : variant === "glass"
      ? "glass text-gray-800 hover:bg-white/30"
      : "bg-gray-900 text-white shadow-md hover:bg-gray-800";
    return <button ref={ref} className={cn(base, styles, className)} {...props} />;
  }
);
Button.displayName = "Button";