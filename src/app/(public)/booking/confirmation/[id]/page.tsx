"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Booking } from "@/types";
import { bookingService } from "@/services/bookingService";
import { BookingConfirmedCard } from "@/components/booking/BookingConfirmedCard";
import { EmptyState } from "@/components/shared/EmptyState";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [booking, setBooking] = React.useState<Booking | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      bookingService.getBookingById(id).then((b) => {
        setBooking(b);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center font-serif italic text-stone-soft">
        Retrieving Confirmation Voucher...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="py-20 max-w-md mx-auto">
        <EmptyState
          title="Reservation Not Found"
          description="We could not find a booking matching this identifier. It may have expired or been removed."
          actionLabel="Return Home"
          onAction={() => router.push("/")}
        />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <BookingConfirmedCard booking={booking} />
    </div>
  );
}
