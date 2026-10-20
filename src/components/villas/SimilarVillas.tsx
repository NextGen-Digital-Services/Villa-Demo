import * as React from "react";
import { Villa } from "@/types";
import { VillaCard } from "./VillaCard";

interface SimilarVillasProps {
  villas: Villa[];
}

export function SimilarVillas({ villas }: SimilarVillasProps) {
  if (villas.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-stone-soft/20">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Curated Recommendations
        </span>
        <h3 className="font-serif text-3xl font-semibold text-charcoal mt-1">
          Similar Estates You May Admire
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {villas.slice(0, 3).map((villa) => (
          <VillaCard key={villa.id} villa={villa} />
        ))}
      </div>
    </div>
  );
}
