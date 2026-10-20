import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { villaService } from "@/services/villaService";
import { reviewService } from "@/services/reviewService";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { VillaHeader } from "@/components/villas/VillaHeader";
import { VillaGallery } from "@/components/villas/VillaGallery";
import { VillaFacts } from "@/components/villas/VillaFacts";
import { VillaDescription } from "@/components/villas/VillaDescription";
import { VillaAmenities } from "@/components/villas/VillaAmenities";
import { VillaDining } from "@/components/villas/VillaDining";
import { VillaRules } from "@/components/villas/VillaRules";
import { VillaMap } from "@/components/villas/VillaMap";
import { VillaStickyBooking } from "@/components/villas/VillaStickyBooking";
import { VillaMobileBar } from "@/components/villas/VillaMobileBar";
import { VillaReviewsList } from "@/components/villas/VillaReviewsList";
import { SimilarVillas } from "@/components/villas/SimilarVillas";
import { Calendar } from "@/components/ui/Calendar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const villa = await villaService.getVillaBySlug(slug);
  if (!villa) return { title: "Villa Not Found" };

  return {
    title: `${villa.name} - Luxury Villa in ${villa.destination}`,
    description: villa.description,
    openGraph: {
      title: `${villa.name} | VillaOne Luxury Estates`,
      description: villa.tagline,
      images: [{ url: villa.images[0] || "/images/hero/hero_main.jpg", alt: villa.name }],
    },
  };
}

export default async function VillaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const villa = await villaService.getVillaBySlug(slug);
  if (!villa) notFound();

  const [reviews, similar] = await Promise.all([
    reviewService.getReviews(villa.slug),
    villaService.getRecommendedVillas(villa.slug),
  ]);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: villa.name,
    description: villa.description,
    image: villa.images,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: villa.pricePerNight,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: villa.rating,
      reviewCount: villa.reviewCount,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 lg:pb-12">
      <JsonLd data={jsonLdData} />
      <Breadcrumbs items={[{ label: "Villas", href: "/villas" }, { label: villa.name }]} />

      <VillaHeader villa={villa} />
      <VillaGallery images={villa.images} villaName={villa.name} />
      <VillaFacts villa={villa} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start pt-4">
        <div className="lg:col-span-2 space-y-10">
          <VillaDescription villa={villa} />
          <VillaAmenities amenities={villa.amenities} />
          <VillaDining foodOptions={villa.foodOptions} />

          {/* Availability Calendar */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold text-charcoal">
              Availability & Reserved Dates
            </h3>
            <p className="text-xs text-stone-soft">Dates with cross lines are already reserved by private parties.</p>
            <Calendar blockedDates={villa.blockedDates} />
          </div>

          <VillaRules rules={villa.houseRules} cancellationPolicy={villa.cancellationPolicy} />
          <VillaMap location={villa.location} villaName={villa.name} />
          <VillaReviewsList reviews={reviews} rating={villa.rating} reviewCount={villa.reviewCount} />
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <VillaStickyBooking villa={villa} />
        </div>
      </div>

      <SimilarVillas villas={similar} />
      <VillaMobileBar pricePerNight={villa.pricePerNight} slug={villa.slug} />
    </div>
  );
}
