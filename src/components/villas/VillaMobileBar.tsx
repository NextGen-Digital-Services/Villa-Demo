"use client";

import * as React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";

interface VillaMobileBarProps {
  pricePerNight: number;
  slug: string;
}

export function VillaMobileBar({ pricePerNight, slug }: VillaMobileBarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-soft/30 px-4 py-3 shadow-2xl flex items-center justify-between">
      <div>
        <span className="text-[10px] text-stone-soft uppercase tracking-wider block">Price per night</span>
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-xl font-bold text-charcoal">
            {formatCurrency(pricePerNight)}
          </span>
          <span className="text-xs text-stone-soft">+ taxes</span>
        </div>
      </div>

      <Link href={`/booking/${slug}`}>
        <Button variant="primary" size="md" className="font-bold px-6">
          Book Now
        </Button>
      </Link>
    </div>
  );
}
