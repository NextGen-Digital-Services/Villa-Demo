import * as React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { staticImages } from "@/data/images";

export const metadata: Metadata = {
  title: "About VillaOne | The Italian Luxury Philosophy",
  description: "Discover how VillaOne brings timeless Tuscan masonry, Lake Como grandeur, and authentic Italian hospitality to India's most breathtaking retreats.",
};

export default function AboutPage() {
  const stats = [
    { value: "14", label: "Curated Estates" },
    { value: "100%", label: "Private Infinity Pools" },
    { value: "4.96", label: "Average Guest Rating" },
    { value: "24/7", label: "Dedicated Concierge" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
          The VillaOne Atelier
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-charcoal">
          The Art of Living Well
        </h1>
        <p className="text-base text-stone-soft leading-relaxed font-light">
          Rooted in the Italian philosophy of <em>sprezzatura</em> &mdash; effortless elegance &mdash; VillaOne was founded to introduce private architectural sanctuaries across India.
        </p>
      </div>

      <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden shadow-xl border border-stone-soft/30">
        <Image
          src={staticImages.about.story.src}
          alt={staticImages.about.story.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-lg">
          <p className="font-serif text-xl sm:text-2xl font-light italic">
            &ldquo;Every arch, stone terrace, and olive courtyard is curated to offer an experience of timeless quietude.&rdquo;
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-stone-soft/20 text-center">
        {stats.map((s, idx) => (
          <div key={idx} className="space-y-1">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-cypress">{s.value}</span>
            <p className="text-xs uppercase tracking-wider text-stone-soft font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Our Heritage</span>
          <h2 className="font-serif text-3xl font-semibold text-charcoal">Italian Soul, Indian Vistas</h2>
          <p className="text-sm text-charcoal/80 leading-relaxed font-light">
            From hand-plastered terracotta arches overlooking the cliffs of North Goa to deodar timber chalets framed by snow-clad Solang peaks, each estate preserves the quiet harmony between refined architecture and nature.
          </p>
          <p className="text-sm text-charcoal/80 leading-relaxed font-light">
            Our culinary brigades are coached in artisanal sourdoughs, hand-rolled Piedmontese agnolotti, and fragrant Mediterranean grills, while honoring local regional specialties.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-sand/40 border border-stone-soft/25 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-charcoal">The 120-Point Villa Audit</h3>
          <p className="text-xs text-stone-soft leading-relaxed">
            Unlike mass listing directories, we do not aggregate thousands of properties. We handpick, certify, and manage a select enclave of homes where every linen, knife, mattress, and acoustic detail meets our private standard.
          </p>
          <div className="pt-2">
            <Link href="/villas" className="text-xs uppercase font-bold tracking-wider text-cypress hover:text-terracotta underline">
              Browse Signature Enclaves &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
