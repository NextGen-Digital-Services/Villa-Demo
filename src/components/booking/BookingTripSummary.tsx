import * as React from "react";
import Image from "next/image";
import { Calendar, Users, MapPin, ShieldCheck } from "lucide-react";
import { Villa, PricingBreakdown } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface BookingTripSummaryProps {
  villa: Villa;
  checkIn: string;
  checkOut: string;
  guests: number;
  pricing: PricingBreakdown;
  payType: "advance" | "full";
}

export function BookingTripSummary({
  villa,
  checkIn,
  checkOut,
  guests,
  pricing,
  payType,
}: BookingTripSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-soft/30 p-6 shadow-lg space-y-6">
      <div className="flex gap-4 items-center pb-6 border-b border-stone-soft/20">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-sand shrink-0">
          <Image
            src={villa.images[0] || "/images/hero/hero_main.jpg"}
            alt={villa.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-gold-dark">
            {villa.destination}
          </span>
          <h3 className="font-serif text-lg font-semibold text-charcoal line-clamp-1">
            {villa.name}
          </h3>
          <p className="text-xs text-stone-soft flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />
            {villa.location.city}
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs border-b border-stone-soft/20 pb-6">
        <div className="flex justify-between items-center">
          <span className="text-stone-soft flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold-dark" />
            Dates
          </span>
          <span className="font-semibold text-charcoal">
            {formatDate(checkIn)} &ndash; {formatDate(checkOut)} ({pricing.nights} {pricing.nights === 1 ? "night" : "nights"})
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-stone-soft flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gold-dark" />
            Guests
          </span>
          <span className="font-semibold text-charcoal">
            {guests} {guests === 1 ? "Guest" : "Guests"}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-xs text-stone-soft">
        <div className="flex justify-between">
          <span>{formatCurrency(villa.pricePerNight)} &times; {pricing.nights} nights</span>
          <span className="text-charcoal">{formatCurrency(pricing.baseAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Cleaning & sanitization fee</span>
          <span className="text-charcoal">{formatCurrency(pricing.cleaningFee)}</span>
        </div>
        {pricing.discountAmount > 0 && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Privilege Discount ({pricing.couponCodeApplied})</span>
            <span>-{formatCurrency(pricing.discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Taxes & GST (18%)</span>
          <span className="text-charcoal">{formatCurrency(pricing.serviceTaxGst)}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-stone-soft/20 text-sm font-bold text-charcoal">
          <span>Total Stay Amount</span>
          <span className="font-serif text-lg">{formatCurrency(pricing.totalAmount)}</span>
        </div>
        <div className="p-3 rounded-xl bg-sand/40 border border-stone-soft/20 text-xs text-charcoal space-y-1">
          <div className="flex justify-between font-bold text-cypress">
            <span>Payable Today ({payType === "advance" ? "30% Advance" : "100% Full"})</span>
            <span>{formatCurrency(payType === "advance" ? pricing.advanceAmount : pricing.totalAmount)}</span>
          </div>
          {payType === "advance" && (
            <p className="text-[11px] text-stone-soft">
              Balance {formatCurrency(pricing.dueAtCheckIn)} due upon arrival
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-stone-soft pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>100% Secure Transaction • Italian Luxury Guarantee</span>
      </div>
    </div>
  );
}
