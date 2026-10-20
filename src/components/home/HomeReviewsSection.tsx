import * as React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Review } from "@/types";
import { RatingStars } from "@/components/shared/RatingStars";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface HomeReviewsSectionProps {
  reviews: Review[];
}

export function HomeReviewsSection({ reviews }: HomeReviewsSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-soft/20">
      <SectionHeading
        eyebrow="Guest Testimonials"
        title="Unforgettable Stays, Shared Words"
        description="Read impressions from guests who experienced our private Italian sanctuaries."
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="p-8 rounded-2xl bg-white border border-stone-soft/20 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <RatingStars rating={review.rating} size="sm" showNumber={false} />
                <Quote className="w-6 h-6 text-gold/30" />
              </div>
              <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed italic">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-stone-soft/15 flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-sand shrink-0">
                <Image
                  src={review.authorAvatar || "/images/reviews/avatar1.jpg"}
                  alt={review.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-charcoal text-sm">
                  {review.authorName}
                </h4>
                <p className="text-[11px] text-stone-soft">
                  {review.authorLocation} • {review.stayDate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
