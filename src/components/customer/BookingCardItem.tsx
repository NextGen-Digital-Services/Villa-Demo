import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { Booking } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface BookingCardItemProps {
  booking: Booking;
  onRequestCancel: (booking: Booking) => void;
}

export function BookingCardItem({ booking, onRequestCancel }: BookingCardItemProps) {
  const statusBadges = {
    confirmed: <Badge variant="success" size="sm">Confirmed</Badge>,
    pending: <Badge variant="gold" size="sm">Pending</Badge>,
    completed: <Badge variant="cypress" size="sm">Completed</Badge>,
    cancelled: <Badge variant="terracotta" size="sm">Cancelled</Badge>,
  };

  const isCancellable = booking.status === "confirmed" || booking.status === "pending";

  return (
    <div className="bg-white rounded-2xl border border-stone-soft/25 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
      <div className="flex gap-4 items-center">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-sand shrink-0">
          <Image
            src={booking.villaImage || "/images/hero/hero_main.jpg"}
            alt={booking.villaName}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-cypress">{booking.bookingCode}</span>
            {statusBadges[booking.status]}
          </div>
          <Link href={`/villas/${booking.villaSlug}`}>
            <h4 className="font-serif text-lg font-semibold text-charcoal hover:text-cypress transition-colors">
              {booking.villaName}
            </h4>
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-stone-soft">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold-dark" />
              {formatDate(booking.checkInDate)} &ndash; {formatDate(booking.checkOutDate)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-gold-dark" />
              {booking.guests.adults + booking.guests.children} Guests
            </span>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-soft/15 gap-2">
        <div className="text-right">
          <span className="text-[10px] text-stone-soft uppercase tracking-wider block">Total Amount</span>
          <span className="font-serif text-base font-bold text-charcoal">
            {formatCurrency(booking.pricing.totalAmount)}
          </span>
          {booking.cancellationRefund !== undefined && (
            <span className="text-[10px] text-emerald-700 block font-medium">
              Refund: {formatCurrency(booking.cancellationRefund)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isCancellable && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => onRequestCancel(booking)}
            >
              Cancel Stay
            </Button>
          )}
          <Link href={`/booking/confirmation/${booking.id}`}>
            <Button variant="secondary" size="sm" className="text-xs">
              Voucher
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
