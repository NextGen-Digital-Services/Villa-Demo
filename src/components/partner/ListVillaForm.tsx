"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { VillaCategory } from "@/types";
import { villaService } from "@/services/villaService";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/hooks/useToast";
import { standardAmenities } from "@/data/amenities";

export function ListVillaForm() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [name, setName] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  const [destination, setDestination] = React.useState("Goa");
  const [category, setCategory] = React.useState<VillaCategory>("beachfront");
  const [price, setPrice] = React.useState("65000");
  const [guests, setGuests] = React.useState("10");
  const [amenities, setAmenities] = React.useState<string[]>(["pool", "chef", "wifi"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return setStep(step + 1);

    setIsSubmitting(true);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await villaService.createVilla({
      slug: slug || `villa-${Date.now()}`,
      name,
      tagline,
      description: `${name} is an exquisite private sanctuary in ${destination}.`,
      story: "Crafted with authentic Italian materials, terracotta accents, and peaceful courtyards.",
      destination,
      category,
      pricePerNight: Number(price),
      cleaningFee: 3500,
      securityDeposit: 25000,
      maxGuests: Number(guests),
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 6200,
      amenities,
      images: ["/images/categories/luxurypool.jpg", "/images/villas/living.jpg"],
      rating: 5.0,
      reviewCount: 0,
      isFeatured: false,
      isAvailable: true,
      blockedDates: [],
      houseRules: {
        checkInTime: "14:00",
        checkOutTime: "11:00",
        quietHours: "23:00 - 08:00",
        petsAllowed: true,
        smokingAllowed: false,
        partiesAllowed: false,
        additionalRules: [],
      },
      foodOptions: { chefAvailable: true, breakfastIncluded: true, cuisines: ["Italian"], description: "Chef available." },
      cancellationPolicy: "moderate",
      ownerId: "own-1",
      location: {
        latitude: 15.6,
        longitude: 73.7,
        address: `Estate Avenue, ${destination}`,
        city: destination,
        state: destination,
        googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843!2d73.7!3d15.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDM2JzA3LjkiTiA3M8KwNDQnMTcuMiJF!5e0!3m2!1sen!2sin!4v1600000000000",
      },
    });

    showToast("Estate Submitted", "Your villa has been registered to VillaOne portfolio.", "success");
    setIsSubmitting(false);
    router.push("/partner");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-soft/25 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-soft/20">
        <span className="text-[10px] uppercase font-bold text-gold-dark">Step {step} of 3</span>
      </div>

      {step === 1 && (
        <div className="space-y-4 text-xs">
          <Input label="Estate Name" placeholder="e.g. Villa Serenissima" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Tagline" placeholder="e.g. Cliffside Tuscan Palazzo" value={tagline} onChange={(e) => setTagline(e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="border rounded-lg p-2.5 bg-white text-xs">
              {["Goa", "Alibaug", "Lonavala", "Udaipur", "Jaipur", "Manali", "Kasauli"].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value as VillaCategory)} className="border rounded-lg p-2.5 bg-white text-xs">
              {["beachfront", "hillstation", "luxurypool", "heritage", "family", "petfriendly"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 text-xs">
          <Input label="Max Guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} />
          <Input label="Nightly Rate (INR)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3 text-xs">
          <label className="block text-xs font-semibold uppercase text-charcoal/80">Signature Amenities</label>
          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl border bg-sand/30">
            {standardAmenities.map((a) => (
              <label key={a.id} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={amenities.includes(a.id)} onChange={() => setAmenities((prev) => prev.includes(a.id) ? prev.filter((i) => i !== a.id) : [...prev, a.id])} />
                <span>{a.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-stone-soft/20">
        {step > 1 ? <Button type="button" variant="outline" size="sm" onClick={() => setStep(step - 1)}>Back</Button> : <div />}
        <Button type="submit" variant="primary" size="md" isLoading={isSubmitting}>
          {step === 3 ? "Submit Estate" : "Continue &rarr;"}
        </Button>
      </div>
    </form>
  );
}
