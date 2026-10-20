import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3 mb-10",
        centered ? "text-center max-w-2xl mx-auto" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal tracking-tight leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-stone-soft text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
