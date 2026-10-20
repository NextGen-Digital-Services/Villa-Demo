import * as React from "react";
import {
  Waves, Utensils, Wifi, Wind, Mountain, Sparkles, TreePine, Flame, Dog, Zap, ShieldCheck, FlameKindling, Check,
} from "lucide-react";
import { standardAmenities } from "@/data/amenities";

interface VillaAmenitiesProps {
  amenities: string[];
}

export function VillaAmenities({ amenities }: VillaAmenitiesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Waves": return <Waves className="w-5 h-5 text-gold-dark" />;
      case "Utensils": return <Utensils className="w-5 h-5 text-gold-dark" />;
      case "Wifi": return <Wifi className="w-5 h-5 text-gold-dark" />;
      case "Wind": return <Wind className="w-5 h-5 text-gold-dark" />;
      case "Mountain": return <Mountain className="w-5 h-5 text-gold-dark" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-gold-dark" />;
      case "TreePine": return <TreePine className="w-5 h-5 text-gold-dark" />;
      case "Flame": return <Flame className="w-5 h-5 text-gold-dark" />;
      case "Dog": return <Dog className="w-5 h-5 text-gold-dark" />;
      case "Zap": return <Zap className="w-5 h-5 text-gold-dark" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5 text-gold-dark" />;
      case "FlameKindling": return <FlameKindling className="w-5 h-5 text-gold-dark" />;
      default: return <Check className="w-5 h-5 text-gold-dark" />;
    }
  };

  const matched = standardAmenities.filter((a) => amenities.includes(a.id));

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-2xl font-semibold text-charcoal">
        What This Estate Offers
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {matched.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-soft/20 bg-white/70 hover:bg-white transition-colors"
          >
            {getIcon(item.iconName)}
            <span className="text-sm font-medium text-charcoal">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
