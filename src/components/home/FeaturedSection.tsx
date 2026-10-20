import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Villa } from "@/types";
import { VillaCard } from "@/components/villas/VillaCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface FeaturedSectionProps {
  villas: Villa[];
}

export function FeaturedSection({ villas }: FeaturedSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-soft/20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
        <SectionHeading
          eyebrow="Signature Portfolio"
          title="Featured Villa Estates"
          description="Handpicked private palazzos and coastal sanctuaries with outstanding amenities and reviews."
          className="mb-0"
        />

        <Link
          href="/villas"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cypress hover:text-terracotta transition-colors group"
        >
          <span>Explore All {villas.length}+ Estates</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {villas.slice(0, 6).map((villa) => (
          <VillaCard key={villa.id} villa={villa} />
        ))}
      </div>
    </section>
  );
}
