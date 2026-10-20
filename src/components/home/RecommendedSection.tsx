import * as React from "react";
import { Sparkles } from "lucide-react";
import { Villa } from "@/types";
import { VillaCard } from "@/components/villas/VillaCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface RecommendedSectionProps {
  villas: Villa[];
}

export function RecommendedSection({ villas }: RecommendedSectionProps) {
  if (villas.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-sand/20 rounded-3xl border border-stone-soft/20 my-12">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gold-dark uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-gold" />
        <span>Curated For Your Taste</span>
      </div>
      <SectionHeading
        eyebrow="Bespoke Suggestions"
        title="Recommended For You"
        description="Hand-selected by our concierge algorithm based on current seasonal light and high guest satisfaction."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {villas.slice(0, 3).map((villa) => (
          <VillaCard key={villa.id} villa={villa} />
        ))}
      </div>
    </section>
  );
}
