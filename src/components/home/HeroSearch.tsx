"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function HeroSearch() {
  const router = useRouter();
  const [destination, setDestination] = React.useState("all");
  const [checkIn, setCheckIn] = React.useState("");
  const [guests, setGuests] = React.useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination && destination !== "all") params.set("destination", destination.toLowerCase());
    if (checkIn) params.set("checkIn", checkIn);
    if (guests > 1) params.set("guests", guests.toString());

    router.push(`/villas?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto bg-ivory/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-stone-soft/30 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs"
    >
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-stone-soft/20">
        <MapPin className="w-5 h-5 text-gold-dark shrink-0" />
        <div className="flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-soft">
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-transparent font-medium text-charcoal focus:outline-none cursor-pointer"
          >
            <option value="all">All Indian Retreats</option>
            {siteConfig.destinations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-stone-soft/20">
        <Calendar className="w-5 h-5 text-gold-dark shrink-0" />
        <div className="flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-soft">
            Check-In
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent font-medium text-charcoal focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-stone-soft/20">
        <Users className="w-5 h-5 text-gold-dark shrink-0" />
        <div className="flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-soft">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-transparent font-medium text-charcoal focus:outline-none cursor-pointer"
          >
            {[1, 2, 4, 6, 8, 10, 12, 16].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full h-full min-h-[52px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-cypress-dark"
        >
          <Search className="w-4 h-4" />
          <span>Search Villas</span>
        </Button>
      </div>
    </form>
  );
}
