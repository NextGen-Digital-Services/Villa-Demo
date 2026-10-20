"use client";

import * as React from "react";
import { standardAmenities } from "@/data/amenities";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "@/components/ui/Checkbox";

export interface FilterState {
  destination: string;
  category: string;
  maxPrice: number;
  guests: number;
  bedrooms: number;
  amenities: string[];
}

interface VillaFiltersSidebarProps {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onReset: () => void;
  className?: string;
}

export function VillaFiltersSidebar({
  filters,
  onChange,
  onReset,
  className,
}: VillaFiltersSidebarProps) {
  const toggleAmenity = (id: string) => {
    const exists = filters.amenities.includes(id);
    const updated = exists
      ? filters.amenities.filter((a) => a !== id)
      : [...filters.amenities, id];
    onChange({ amenities: updated });
  };

  const destinations = ["all", "Goa", "Alibaug", "Lonavala", "Udaipur", "Jaipur", "Manali", "Kasauli", "Rishikesh"];
  const categories = [
    { id: "all", label: "All Estates" },
    { id: "beachfront", label: "Beachfront" },
    { id: "hillstation", label: "Hill Station" },
    { id: "luxurypool", label: "Luxury Pool" },
    { id: "heritage", label: "Heritage Palazzo" },
    { id: "family", label: "Family Estate" },
    { id: "petfriendly", label: "Pet Friendly" },
  ];

  return (
    <div className={`space-y-6 bg-white/90 p-6 rounded-2xl border border-stone-soft/25 ${className || ""}`}>
      <div className="flex items-center justify-between pb-4 border-b border-stone-soft/20">
        <h3 className="font-serif text-lg font-semibold text-charcoal">Filters</h3>
        <button onClick={onReset} className="text-xs text-terracotta hover:underline font-medium">
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">Destination</label>
        <select
          value={filters.destination}
          onChange={(e) => onChange({ destination: e.target.value })}
          className="w-full bg-sand/40 border border-stone-soft/30 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold cursor-pointer"
        >
          {destinations.map((d) => (
            <option key={d} value={d}>{d === "all" ? "All Indian Destinations" : d}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">Category</label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onChange({ category: c.id })}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                filters.category === c.id
                  ? "bg-cypress text-ivory border-cypress font-medium"
                  : "bg-transparent text-charcoal border-stone-soft/30 hover:bg-sand"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-charcoal/80">Max Nightly Rate</span>
          <span className="font-serif font-bold text-charcoal">{formatCurrency(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          min="30000"
          max="100000"
          step="5000"
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-cypress cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">Guests</label>
        <div className="flex gap-2">
          {[1, 4, 8, 12].map((g) => (
            <button
              key={g}
              onClick={() => onChange({ guests: g })}
              className={`flex-1 py-1.5 text-xs rounded-lg border text-center transition-all ${
                filters.guests === g ? "bg-cypress text-ivory border-cypress font-bold" : "border-stone-soft/30 text-charcoal hover:bg-sand"
              }`}
            >
              {g}+
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-stone-soft/20">
        <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">Signature Amenities</label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {standardAmenities.map((amenity) => (
            <Checkbox
              key={amenity.id}
              label={amenity.name}
              checked={filters.amenities.includes(amenity.id)}
              onChange={() => toggleAmenity(amenity.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
