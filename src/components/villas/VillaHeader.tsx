"use client";

import * as React from "react";
import { MapPin, Share2, Heart } from "lucide-react";
import { Villa } from "@/types";
import { RatingStars } from "@/components/shared/RatingStars";
import { showToast } from "@/hooks/useToast";

interface VillaHeaderProps {
  villa: Villa;
}

export function VillaHeader({ villa }: VillaHeaderProps) {
  const [isSaved, setIsSaved] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link Copied", "Estate link copied to clipboard.", "info");
    }
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    showToast(
      !isSaved ? "Saved to Wishlist" : "Removed from Wishlist",
      !isSaved ? `${villa.name} has been added to your favorites.` : "",
      "success"
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
            {villa.destination} • {villa.category.toUpperCase()}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal tracking-tight mt-1">
            {villa.name}
          </h1>
          <p className="text-sm text-stone-soft mt-1 italic">{villa.tagline}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-soft/30 hover:bg-sand text-xs font-medium text-charcoal transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-soft" />
            Share
          </button>
          <button
            onClick={handleToggleSave}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-colors text-xs font-medium ${
              isSaved
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-stone-soft/30 hover:bg-sand text-charcoal"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-red-500 text-red-500" : "text-stone-soft"}`} />
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-soft pt-1">
        <RatingStars rating={villa.rating} reviewCount={villa.reviewCount} size="sm" />
        <span>•</span>
        <div className="flex items-center gap-1 text-charcoal/80">
          <MapPin className="w-3.5 h-3.5 text-gold-dark" />
          <span>{villa.location.address}, {villa.location.city}</span>
        </div>
      </div>
    </div>
  );
}
