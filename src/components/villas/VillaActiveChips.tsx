"use client";

import * as React from "react";
import { X } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

interface VillaActiveChipsProps {
  filters: {
    destination?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    guests?: number;
    amenities?: string[];
  };
  onRemove: (key: string, value?: string) => void;
  onClearAll: () => void;
}

export function VillaActiveChips({ filters, onRemove, onClearAll }: VillaActiveChipsProps) {
  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.destination && filters.destination !== "all") {
    chips.push({
      label: `Location: ${filters.destination}`,
      onRemove: () => onRemove("destination"),
    });
  }
  if (filters.category && filters.category !== "all") {
    chips.push({
      label: `Category: ${filters.category}`,
      onRemove: () => onRemove("category"),
    });
  }
  if (filters.minPrice || filters.maxPrice) {
    chips.push({
      label: `Price: ${formatCurrency(filters.minPrice || 30000)} - ${formatCurrency(filters.maxPrice || 100000)}`,
      onRemove: () => onRemove("price"),
    });
  }
  if (filters.guests && filters.guests > 1) {
    chips.push({
      label: `${filters.guests}+ Guests`,
      onRemove: () => onRemove("guests"),
    });
  }
  if (filters.bedrooms && filters.bedrooms > 1) {
    chips.push({
      label: `${filters.bedrooms}+ Bedrooms`,
      onRemove: () => onRemove("bedrooms"),
    });
  }
  filters.amenities?.forEach((amenity) => {
    chips.push({
      label: `Amenity: ${amenity}`,
      onRemove: () => onRemove("amenity", amenity),
    });
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 pb-4">
      <span className="text-xs text-stone-soft uppercase tracking-wider font-medium">Active:</span>
      {chips.map((chip, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sand text-charcoal text-xs font-medium border border-stone-soft/30"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="text-stone-soft hover:text-charcoal p-0.5 rounded-full hover:bg-white"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-terracotta hover:underline ml-2 font-medium"
      >
        Clear All
      </button>
    </div>
  );
}
