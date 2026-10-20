import * as React from "react";
import { villaService } from "@/services/villaService";
import { offerService } from "@/services/offerService";
import { reviewService } from "@/services/reviewService";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { OffersSection } from "@/components/home/OffersSection";
import { WhyVillaOne } from "@/components/home/WhyVillaOne";
import { HomeReviewsSection } from "@/components/home/HomeReviewsSection";
import { RecommendedSection } from "@/components/home/RecommendedSection";
import { NewsletterCta } from "@/components/home/NewsletterCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { siteConfig } from "@/config/site";

export default async function HomePage() {
  const [featuredVillas, recommendedVillas, offers, reviews] = await Promise.all([
    villaService.getFeaturedVillas(),
    villaService.getRecommendedVillas(),
    offerService.getOffers(),
    reviewService.getReviews(),
  ]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.addressMumbai,
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400026",
      addressCountry: "IN",
    },
    priceRange: "₹₹₹₹",
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <Hero />
      <CategoryGrid />
      <FeaturedSection villas={featuredVillas} />
      <OffersSection offers={offers} />
      <WhyVillaOne />
      <HomeReviewsSection reviews={reviews} />
      <RecommendedSection villas={recommendedVillas} />
      <NewsletterCta />
    </>
  );
}
