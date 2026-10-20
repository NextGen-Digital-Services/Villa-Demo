"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Booking } from "@/types";
import { bookingService } from "@/services/bookingService";
import { BookingCardItem } from "@/components/customer/BookingCardItem";
import { CancelBookingModal } from "@/components/customer/CancelBookingModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { showToast } from "@/hooks/useToast";

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [cancellingBooking, setCancellingBooking] = React.useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"all" | "upcoming" | "past">("all");

  const loadBookings = () => {
    bookingService.getBookings().then((b) => {
      setBookings(b);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    loadBookings();
  }, []);

  const handleConfirmCancel = async (bookingId: string) => {
    setIsCancelling(true);
    const { refundAmount } = await bookingService.cancelBooking(bookingId);
    setIsCancelling(false);
    setCancellingBooking(null);
    showToast("Booking Cancelled", `Refund of ₹${refundAmount.toLocaleString("en-IN")} initiated.`, "info");
    loadBookings();
  };

  const filtered = bookings.filter((b) => {
    if (activeTab === "upcoming") return b.status === "confirmed" || b.status === "pending";
    if (activeTab === "past") return b.status === "completed" || b.status === "cancelled";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-stone-soft/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Client Portal</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">My Stays & Bookings</h1>
        </div>

        <div className="flex gap-2 text-xs">
          {(["all", "upcoming", "past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg capitalize font-medium transition-all ${
                activeTab === tab ? "bg-cypress text-ivory font-bold" : "bg-sand text-charcoal hover:bg-stone-light"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-serif italic text-stone-soft">Loading Stays...</div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No Stays in This Category"
          description="You currently have no reservation records in this view. Discover our Italian villa portfolio to plan your next retreat."
          actionLabel="Explore Villas"
          onAction={() => router.push("/villas")}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <BookingCardItem key={b.id} booking={b} onRequestCancel={setCancellingBooking} />
          ))}
        </div>
      )}

      <CancelBookingModal
        isOpen={!!cancellingBooking}
        onClose={() => setCancellingBooking(null)}
        booking={cancellingBooking}
        onConfirmCancel={handleConfirmCancel}
        isCancelling={isCancelling}
      />
    </div>
  );
}
