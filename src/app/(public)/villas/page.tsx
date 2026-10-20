import * as React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { villaService } from "@/services/villaService";
import { VillasListingClient } from "@/components/villas/VillasListingClient";

export const metadata: Metadata = {
  title: "Italian Luxury Villa Estates in India",
  description:
    "Explore our full curated portfolio of Tuscan palazzos, Amalfi beachfront pavilions, and Himalayan alpine chalets with private infinity pools and dedicated chefs.",
  openGraph: {
    title: "All Italian Luxury Villas | VillaOne",
    description: "Curated private estates across Goa, Alibaug, Lonavala, Udaipur, and Manali.",
  },
};

export default async function VillasPage() {
  const initialVillas = await villaService.getAllVillas();

  return (
    <Suspense
      fallback={
        <div className="py-24 text-center font-serif italic text-stone-soft">
          Loading Curated Estates...
        </div>
      }
    >
      <VillasListingClient initialVillas={initialVillas} />
    </Suspense>
  );
}
