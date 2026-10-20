"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Printer, MessageSquare, ArrowRight, Calendar, Users } from "lucide-react";
import { Booking } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";

interface BookingConfirmedCardProps {
  booking: Booking;
}

export function BookingConfirmedCard({ booking }: BookingConfirmedCardProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=I%20have%20booked%20${encodeURIComponent(booking.villaName)}%20with%20VillaOne!%20Booking%20Code:%20${booking.bookingCode}`;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-stone-soft/30 p-6 sm:p-10 shadow-xl space-y-8">
      <div className="text-center space-y-3 pb-6 border-b border-stone-soft/20">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
          Reservation Confirmed
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">
          Benvenuto! Your Stay is Secured
        </h2>
        <div className="inline-block bg-sand/60 px-4 py-2 rounded-full border border-stone-soft/30 text-xs">
          Booking Reference: <span className="font-mono font-bold text-cypress">{booking.bookingCode}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-sand border border-stone-soft/20">
          <Image
            src={booking.villaImage || "/images/hero/hero_main.jpg"}
            alt={booking.villaName}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-gold-dark">{booking.locationCity}</span>
            <h3 className="font-serif text-2xl font-semibold text-charcoal">{booking.villaName}</h3>
          </div>

          <div className="space-y-2 text-stone-soft border-t border-stone-soft/15 pt-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-dark" />
              <span>{formatDate(booking.checkInDate)} &ndash; {formatDate(booking.checkOutDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gold-dark" />
              <span>{booking.guests.adults + booking.guests.children} Guests registered</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-soft/15 text-charcoal font-semibold">
              <span>Paid Amount:</span>
              <span className="text-cypress font-serif text-base">{formatCurrency(booking.paymentType === "advance" ? booking.pricing.advanceAmount : booking.pricing.totalAmount)}</span>
            </div>
            {booking.paymentType === "advance" && (
              <p className="text-[11px] text-stone-soft">Balance {formatCurrency(booking.pricing.dueAtCheckIn)} due at check-in</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-between pt-6 border-t border-stone-soft/20">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5">
            <Printer className="w-3.5 h-3.5" />
            Print Voucher
          </Button>
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              Share on WhatsApp
            </Button>
          </a>
        </div>

        <Link href="/my-bookings">
          <Button variant="primary" size="sm" className="gap-1.5">
            <span>View My Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
