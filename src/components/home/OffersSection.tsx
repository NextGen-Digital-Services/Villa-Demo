"use client";

import * as React from "react";
import { Tag, Copy, Check } from "lucide-react";
import { OfferCoupon } from "@/types";
import { showToast } from "@/hooks/useToast";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface OffersSectionProps {
  offers: OfferCoupon[];
}

export function OffersSection({ offers }: OffersSectionProps) {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      showToast("Coupon Copied", `Code "${code}" is ready to apply at checkout.`, "success");
      setTimeout(() => setCopiedCode(null), 3000);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-sand/30 rounded-3xl border border-stone-soft/20 my-12">
      <SectionHeading
        eyebrow="Privileged Access"
        title="Exclusive Stays & Seasonal Privileges"
        description="Take advantage of our bespoke seasonal codes and direct booking advantages."
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-6 rounded-2xl bg-white border border-stone-soft/30 shadow-xs flex flex-col justify-between space-y-4 hover:border-gold/60 transition-colors"
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full">
                <Tag className="w-3 h-3" />
                {offer.discountType === "percentage" ? `${offer.discountValue}% OFF` : `₹${offer.discountValue.toLocaleString("en-IN")} OFF`}
              </span>
              <h4 className="font-serif text-lg font-semibold text-charcoal">
                {offer.title}
              </h4>
              <p className="text-xs text-stone-soft leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-soft/15 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cypress bg-sand px-3 py-1.5 rounded-md border border-stone-soft/30">
                {offer.code}
              </span>
              <button
                onClick={() => handleCopy(offer.code)}
                className="flex items-center gap-1 text-xs font-medium text-charcoal hover:text-cypress"
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-soft" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
