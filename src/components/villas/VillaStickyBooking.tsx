"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Phone } from "lucide-react";
import { Villa } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { useBookingPrice } from "@/hooks/useBookingPrice";
import { offerService } from "@/services/offerService";
import { showToast } from "@/hooks/useToast";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

interface VillaStickyBookingProps {
  villa: Villa;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
}

export function VillaStickyBooking({ villa, defaultCheckIn, defaultCheckOut }: VillaStickyBookingProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = React.useState(defaultCheckIn || "2026-11-15");
  const [checkOut, setCheckOut] = React.useState(defaultCheckOut || "2026-11-18");
  const [guests, setGuests] = React.useState(2);
  const [payType, setPayType] = React.useState<"advance" | "full">("advance");
  const [couponCode, setCouponCode] = React.useState("");
  const [discountAmount, setDiscountAmount] = React.useState(0);
  const [appliedCoupon, setAppliedCoupon] = React.useState("");

  const pricing = useBookingPrice({
    ratePerNight: villa.pricePerNight,
    cleaningFee: villa.cleaningFee,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    discountAmount,
    couponCode: appliedCoupon,
  });

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    const res = await offerService.validateCoupon(couponCode, pricing.baseAmount);
    if (res.valid) {
      setDiscountAmount(res.discountAmount);
      setAppliedCoupon(couponCode.toUpperCase());
      showToast("Coupon Applied", res.message, "success");
    } else {
      showToast("Invalid Coupon", res.message, "error");
    }
  };

  const handleBookNow = () => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString(),
      payType,
      ...(appliedCoupon ? { coupon: appliedCoupon } : {}),
    });
    router.push(`/booking/${villa.slug}?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-soft/30 p-6 shadow-xl space-y-5 sticky top-28">
      <div className="flex items-baseline justify-between border-b border-stone-soft/20 pb-4">
        <div>
          <span className="font-serif text-3xl font-bold text-charcoal">{formatCurrency(villa.pricePerNight)}</span>
          <span className="text-xs text-stone-soft"> / night</span>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Available</span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl border border-stone-soft/30 bg-sand/20 text-xs">
        <div className="p-2 border-r border-stone-soft/20">
          <label className="block text-[10px] uppercase font-bold text-stone-soft">Check-in</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full bg-transparent font-medium text-charcoal focus:outline-none cursor-pointer" />
        </div>
        <div className="p-2">
          <label className="block text-[10px] uppercase font-bold text-stone-soft">Check-out</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full bg-transparent font-medium text-charcoal focus:outline-none cursor-pointer" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1.5">Guests</label>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full bg-sand/30 border border-stone-soft/30 rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold">
          {Array.from({ length: villa.maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
          ))}
        </select>
      </div>

      <div className="flex rounded-lg border border-stone-soft/30 p-0.5 bg-sand/30 text-xs">
        <button type="button" onClick={() => setPayType("advance")} className={`flex-1 py-1.5 rounded-md font-medium transition-all ${payType === "advance" ? "bg-cypress text-ivory shadow-xs" : "text-charcoal hover:bg-sand"}`}>
          Pay 30% Advance
        </button>
        <button type="button" onClick={() => setPayType("full")} className={`flex-1 py-1.5 rounded-md font-medium transition-all ${payType === "full" ? "bg-cypress text-ivory shadow-xs" : "text-charcoal hover:bg-sand"}`}>
          Pay 100% Full
        </button>
      </div>

      <div className="flex gap-1.5">
        <input type="text" placeholder="Coupon code (e.g. ITALIA15)" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="flex-1 bg-white border border-stone-soft/30 rounded-lg px-3 py-1.5 text-xs uppercase" />
        <Button variant="outline" size="sm" onClick={handleApplyCoupon}>Apply</Button>
      </div>

      <div className="space-y-1.5 text-xs text-stone-soft pt-2 border-t border-stone-soft/20">
        <div className="flex justify-between"><span>{formatCurrency(villa.pricePerNight)} × {pricing.nights} nights</span><span className="text-charcoal">{formatCurrency(pricing.baseAmount)}</span></div>
        <div className="flex justify-between"><span>Cleaning & sanitization fee</span><span className="text-charcoal">{formatCurrency(pricing.cleaningFee)}</span></div>
        {discountAmount > 0 && <div className="flex justify-between text-emerald-700 font-semibold"><span>Coupon discount ({appliedCoupon})</span><span>-{formatCurrency(discountAmount)}</span></div>}
        <div className="flex justify-between"><span>Taxes & GST (18%)</span><span className="text-charcoal">{formatCurrency(pricing.serviceTaxGst)}</span></div>
        <div className="flex justify-between pt-2 border-t border-stone-soft/20 text-sm font-bold text-charcoal">
          <span>{payType === "advance" ? "Total Payable Today (30%)" : "Total Booking Amount"}</span>
          <span className="font-serif text-lg text-cypress">{formatCurrency(payType === "advance" ? pricing.advanceAmount : pricing.totalAmount)}</span>
        </div>
        {payType === "advance" && <p className="text-[11px] text-stone-soft text-right">Balance {formatCurrency(pricing.dueAtCheckIn)} due at check-in</p>}
      </div>

      <Button variant="primary" size="lg" className="w-full font-bold shadow-md" onClick={handleBookNow}>
        Reserve This Estate
      </Button>

      <div className="flex items-center justify-between pt-2 text-xs">
        <a href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Inquiry%20for%20${encodeURIComponent(villa.name)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-700 hover:underline">
          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Inquiry
        </a>
        <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-1.5 text-stone-soft hover:text-charcoal">
          <Phone className="w-3.5 h-3.5" /> Call Concierge
        </a>
      </div>
    </div>
  );
}
