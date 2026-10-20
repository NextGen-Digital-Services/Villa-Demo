"use client";

import * as React from "react";
import { Booking, BookingStatus } from "@/types";
import { bookingService } from "@/services/bookingService";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { showToast } from "@/hooks/useToast";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadBookings = () => {
    bookingService.getBookings().then((res) => {
      setBookings(res);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = async (id: string, status: BookingStatus) => {
    await bookingService.updateBookingStatus(id, status);
    showToast("Status Updated", `Booking status updated to ${status}.`, "success");
    loadBookings();
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Reservations & Guest Stays"
        subtitle="Manage upcoming arrivals, confirmations, and departure handovers"
      />

      {loading ? (
        <div className="py-20 text-center font-serif italic text-stone-soft">Loading bookings...</div>
      ) : (
        <BookingsTable bookings={bookings} onUpdateStatus={handleUpdateStatus} />
      )}
    </div>
  );
}
