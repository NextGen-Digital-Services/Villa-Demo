import * as React from "react";
import type { Metadata } from "next";
import { offerService } from "@/services/offerService";
import { OffersSection } from "@/components/home/OffersSection";

export const metadata: Metadata = {
  title: "Seasonal Privileges & Direct Booking Offers",
  description: "Explore curated savings, private chef credits, and long-stay rates across VillaOne luxury retreats.",
};

export default async function OffersPage() {
  const offers = await offerService.getOffers(true);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Privileged Rates</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-charcoal">Exclusive Stays & Offers</h1>
        <p className="text-sm text-stone-soft leading-relaxed font-light">
          Enjoy direct reservation advantages, including complimentary vintage sparkling wine on arrival, private chef credits, and special long-stay rates.
        </p>
      </div>

      <OffersSection offers={offers} />
    </div>
  );
}
