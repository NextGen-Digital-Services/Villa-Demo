import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cypress" | "terracotta" | "gold" | "sand" | "outline" | "success";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "sand",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    cypress: "bg-cypress/10 text-cypress border-cypress/20",
    terracotta: "bg-terracotta/10 text-terracotta border-terracotta/25",
    gold: "bg-gold/15 text-gold-dark border-gold/30 font-medium",
    sand: "bg-sand text-charcoal/80 border-stone-soft/30",
    outline: "bg-transparent text-charcoal/80 border-stone-soft/40",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 tracking-wide",
    md: "text-xs px-3 py-1 tracking-wider",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-sans uppercase",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
