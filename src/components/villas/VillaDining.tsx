import * as React from "react";
import { ChefHat } from "lucide-react";
import { FoodOptions } from "@/types";
import { formatCurrency } from "@/lib/formatters";

interface VillaDiningProps {
  foodOptions: FoodOptions;
}

export function VillaDining({ foodOptions }: VillaDiningProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-2xl font-semibold text-charcoal">
        Gastronomy & Private Dining
      </h3>
      <div className="p-6 rounded-2xl bg-sand/40 border border-stone-soft/20 space-y-4">
        <div className="flex items-center gap-3">
          <ChefHat className="w-6 h-6 text-terracotta" />
          <div>
            <h4 className="font-serif font-semibold text-charcoal text-lg">
              {foodOptions.chefAvailable ? "Resident Master Chef Available" : "Self-Catering Kitchen"}
            </h4>
            <p className="text-xs text-stone-soft">
              {foodOptions.breakfastIncluded ? "Complimentary Artisanal Breakfast Included Daily" : "Gourmet meal packages available"}
            </p>
          </div>
        </div>

        <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
          {foodOptions.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {foodOptions.cuisines.map((cuisine, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full bg-white text-cypress font-medium border border-stone-soft/20"
            >
              {cuisine}
            </span>
          ))}
        </div>

        {foodOptions.pricePerDayPerPerson && (
          <div className="pt-3 border-t border-stone-soft/20 flex items-center justify-between text-xs">
            <span className="text-stone-soft">All-inclusive gourmet full-board rate:</span>
            <span className="font-semibold text-charcoal font-serif text-sm">
              {formatCurrency(foodOptions.pricePerDayPerPerson)} / guest / day
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
