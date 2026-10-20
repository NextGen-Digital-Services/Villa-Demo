import * as React from "react";
import Image from "next/image";
import { HeroSearch } from "./HeroSearch";
import { staticImages } from "@/data/images";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Italian Luxury Framing */}
      <div className="absolute inset-0 z-0">
        <Image
          src={staticImages.hero.src}
          alt={staticImages.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-charcoal/20 to-charcoal/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/80 backdrop-blur-md border border-gold/40 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-cypress font-semibold">
            Italian Elegance Across India
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium text-ivory tracking-tight leading-[1.1] drop-shadow-md">
          Private Sanctuaries <br />
          <span className="italic font-normal">of Quiet Luxury</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-ivory/90 font-light leading-relaxed drop-shadow-xs">
          Handpicked Tuscan, Lake Como, and Amalfi-style estates nestled across Goa, Alibaug, Udaipur, and the Himalayan ridges.
        </p>

        <div className="pt-6">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
