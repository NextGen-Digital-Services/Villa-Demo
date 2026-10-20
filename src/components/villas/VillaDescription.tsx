import * as React from "react";
import { Villa } from "@/types";

interface VillaDescriptionProps {
  villa: Villa;
}

export function VillaDescription({ villa }: VillaDescriptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl font-semibold text-charcoal mb-3">
          About the Estate
        </h3>
        <p className="text-sm text-charcoal/85 leading-relaxed font-sans">
          {villa.description}
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-sand/50 border border-stone-soft/25 space-y-2">
        <span className="text-[11px] uppercase font-bold tracking-widest text-gold-dark">
          Architectural Origin
        </span>
        <blockquote className="font-serif italic text-base sm:text-lg text-charcoal leading-snug">
          &ldquo;{villa.story}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
