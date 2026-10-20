import * as React from "react";
import { MapPin } from "lucide-react";
import { LocationCoordinates } from "@/types";

interface VillaMapProps {
  location: LocationCoordinates;
  villaName: string;
}

export function VillaMap({ location, villaName }: VillaMapProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl font-semibold text-charcoal">
          Location & Surroundings
        </h3>
        <span className="text-xs text-stone-soft flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-gold-dark" />
          {location.city}, {location.state}
        </span>
      </div>

      <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-stone-soft/30 shadow-xs">
        <iframe
          src={location.googleMapEmbedUrl}
          title={`Location map of ${villaName}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
        />
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-stone-soft/20 shadow-lg text-xs max-w-xs">
          <p className="font-semibold text-charcoal">{villaName}</p>
          <p className="text-[11px] text-stone-soft mt-0.5">{location.address}</p>
        </div>
      </div>
    </div>
  );
}
