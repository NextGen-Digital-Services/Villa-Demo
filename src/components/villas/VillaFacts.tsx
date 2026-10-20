import * as React from "react";
import { Users, Bed, Bath, Maximize2, Dog } from "lucide-react";
import { Villa } from "@/types";

interface VillaFactsProps {
  villa: Villa;
}

export function VillaFacts({ villa }: VillaFactsProps) {
  const facts = [
    {
      icon: <Users className="w-5 h-5 text-gold-dark" />,
      label: "Guests",
      value: `Up to ${villa.maxGuests} Guests`,
    },
    {
      icon: <Bed className="w-5 h-5 text-gold-dark" />,
      label: "Bedrooms",
      value: `${villa.bedrooms} Master Suites`,
    },
    {
      icon: <Bath className="w-5 h-5 text-gold-dark" />,
      label: "Bathrooms",
      value: `${villa.bathrooms} Luxury Baths`,
    },
    {
      icon: <Maximize2 className="w-5 h-5 text-gold-dark" />,
      label: "Estate Area",
      value: `${villa.areaSqFt.toLocaleString("en-IN")} sq. ft.`,
    },
    {
      icon: <Dog className="w-5 h-5 text-gold-dark" />,
      label: "Pets Policy",
      value: villa.houseRules.petsAllowed ? "Pets Welcomed" : "Pet-Free Estate",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 py-6 border-y border-stone-soft/20">
      {facts.map((fact, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-sand/40 border border-stone-soft/20 text-center"
        >
          {fact.icon}
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-soft mt-1">
            {fact.label}
          </span>
          <span className="text-xs font-semibold text-charcoal mt-0.5">
            {fact.value}
          </span>
        </div>
      ))}
    </div>
  );
}
