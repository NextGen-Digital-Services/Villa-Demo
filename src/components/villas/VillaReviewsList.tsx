import * as React from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Review } from "@/types";
import { RatingStars } from "@/components/shared/RatingStars";

interface VillaReviewsListProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function VillaReviewsList({
  reviews,
  rating,
  reviewCount,
}: VillaReviewsListProps) {
  const categories = [
    { label: "Cleanliness", score: 5.0 },
    { label: "Accuracy", score: 4.9 },
    { label: "Communication", score: 5.0 },
    { label: "Location", score: 4.9 },
    { label: "Value", score: 4.8 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-soft/20">
        <div>
          <h3 className="font-serif text-3xl font-semibold text-charcoal">
            Guest Reviews & Accolades
          </h3>
          <p className="text-xs text-stone-soft mt-1">
            Verified stays by discerning travelers
          </p>
        </div>
        <RatingStars rating={rating} reviewCount={reviewCount} size="lg" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-xl bg-sand/30 border border-stone-soft/20 text-center">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-soft block">
              {cat.label}
            </span>
            <span className="font-serif font-bold text-sm text-charcoal">
              {cat.score.toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white border border-stone-soft/20 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-sand shrink-0">
                  <Image
                    src={rev.authorAvatar || "/images/reviews/avatar1.jpg"}
                    alt={rev.authorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-charcoal text-base">
                    {rev.authorName}
                  </h4>
                  <p className="text-xs text-stone-soft">
                    {rev.authorLocation} • {rev.stayDate}
                  </p>
                </div>
              </div>

              {rev.isVerifiedGuest && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Stay
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed italic">
              &ldquo;{rev.comment}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
