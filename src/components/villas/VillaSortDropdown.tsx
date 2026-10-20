"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";

interface VillaSortDropdownProps {
  value: string;
  onChange: (sort: string) => void;
}

export function VillaSortDropdown({ value, onChange }: VillaSortDropdownProps) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <ArrowUpDown className="w-3.5 h-3.5 text-stone-soft" />
      <span className="text-stone-soft uppercase tracking-wider hidden sm:inline">Sort:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-stone-soft/30 rounded-lg px-2.5 py-1.5 text-xs text-charcoal font-medium focus:outline-none focus:border-gold cursor-pointer"
      >
        <option value="popular">Most Popular</option>
        <option value="rating">Top Rated</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
