"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Bed, Bath, Sparkles } from "lucide-react";
import { Villa } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { RatingStars } from "@/components/shared/RatingStars";
import { Badge } from "@/components/ui/Badge";

interface VillaCardProps {
  villa: Villa;
  priority?: boolean;
}

export function VillaCard({ villa, priority = false }: VillaCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const images = villa.images && villa.images.length > 0
    ? villa.images
    : [`/images/villas/${villa.slug}/01.jpg`];

  return (
    <div className="group relative rounded-2xl bg-white border border-stone-soft/20 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-sand">
        <Image
          src={images[currentImageIndex]}
          alt={villa.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-60" />

        <div className="absolute top-3 left-3 flex gap-1.5">
          {villa.isFeatured && (
            <Badge variant="gold" size="sm" className="bg-ivory/90 backdrop-blur-xs shadow-xs">
              <Sparkles className="w-3 h-3 text-gold" />
              Signature
            </Badge>
          )}
          <Badge variant="sand" size="sm" className="bg-ivory/90 backdrop-blur-xs font-semibold text-charcoal">
            {villa.destination}
          </Badge>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            {images.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? "w-4 bg-white" : "bg-white/60"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <RatingStars rating={villa.rating} reviewCount={villa.reviewCount} size="sm" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-soft">
              {villa.category}
            </span>
          </div>

          <Link href={`/villas/${villa.slug}`}>
            <h3 className="font-serif text-xl font-semibold text-charcoal group-hover:text-cypress transition-colors line-clamp-1">
              {villa.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-soft line-clamp-1">
            {villa.tagline}
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-stone-soft border-t border-stone-soft/10">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-soft" />
              Up to {villa.maxGuests}
            </span>
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-stone-soft" />
              {villa.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-stone-soft" />
              {villa.bathrooms} Baths
            </span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-stone-soft/15 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-soft">From </span>
            <span className="font-serif text-xl font-bold text-charcoal">
              {formatCurrency(villa.pricePerNight)}
            </span>
            <span className="text-[11px] text-stone-soft"> / night</span>
          </div>
          <Link
            href={`/villas/${villa.slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-cypress hover:text-terracotta transition-colors"
          >
            Explore &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
