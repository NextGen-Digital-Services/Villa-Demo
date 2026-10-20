import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { villaService } from "@/services/villaService";
import { BookingCheckoutClient } from "@/components/booking/BookingCheckoutClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const villa = await villaService.getVillaBySlug(slug);
  if (!villa) return { title: "Booking" };

  return {
    title: `Reserve ${villa.name}`,
    description: `Complete your luxury stay reservation for ${villa.name} in ${villa.destination}.`,
  };
}

export default async function BookingPage({ params }: PageProps) {
  const { slug } = await params;
  const villa = await villaService.getVillaBySlug(slug);
  if (!villa) notFound();

  return (
    <Suspense
      fallback={
        <div className="py-24 text-center font-serif italic text-stone-soft">
          Preparing Booking Dossier...
        </div>
      }
    >
      <BookingCheckoutClient villa={villa} />
    </Suspense>
  );
}
