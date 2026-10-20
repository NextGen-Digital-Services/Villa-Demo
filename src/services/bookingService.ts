import { Booking, BookingStatus } from "@/types";
import { initialBookings } from "@/data/mockBookings";
import { getStoredItem, setStoredItem } from "@/lib/storage";
import { generateBookingCode } from "@/lib/utils";

const STORAGE_KEY = "villaone_bookings_store";

function getStore(): Booking[] {
  return getStoredItem<Booking[]>(STORAGE_KEY, initialBookings);
}

function saveStore(bookings: Booking[]): void {
  setStoredItem(STORAGE_KEY, bookings);
}

export const bookingService = {
  async getBookings(filter?: {
    status?: string;
    customerId?: string;
  }): Promise<Booking[]> {
    let bookings = getStore();
    if (filter?.status && filter.status !== "all") {
      bookings = bookings.filter((b) => b.status === filter.status);
    }
    if (filter?.customerId) {
      bookings = bookings.filter((b) => b.customerId === filter.customerId);
    }
    return bookings;
  },

  async getBookingById(id: string): Promise<Booking | null> {
    const bookings = getStore();
    return bookings.find((b) => b.id === id) || null;
  },

  async getBookingByCode(code: string): Promise<Booking | null> {
    const bookings = getStore();
    return (
      bookings.find(
        (b) => b.bookingCode.toUpperCase() === code.toUpperCase()
      ) || null
    );
  },

  async createBooking(
    data: Omit<Booking, "id" | "bookingCode" | "createdAt">
  ): Promise<Booking> {
    const bookings = getStore();
    const newBooking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      bookingCode: generateBookingCode(),
      createdAt: new Date().toISOString(),
    };
    saveStore([newBooking, ...bookings]);
    return newBooking;
  },

  async updateBookingStatus(
    id: string,
    status: BookingStatus
  ): Promise<Booking> {
    const bookings = getStore();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Booking not found");
    bookings[index] = { ...bookings[index], status };
    saveStore(bookings);
    return bookings[index];
  },

  async cancelBooking(
    id: string
  ): Promise<{ booking: Booking; refundAmount: number }> {
    const bookings = getStore();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Booking not found");
    const booking = bookings[index];

    // Calculate refund based on policy and days before check-in
    const checkIn = new Date(booking.checkInDate).getTime();
    const now = new Date().getTime();
    const daysUntilCheckIn = (checkIn - now) / (1000 * 60 * 60 * 24);

    let refundPercent = 0.5; // default 50%
    if (daysUntilCheckIn >= 14) {
      refundPercent = 1.0; // 100% full refund
    } else if (daysUntilCheckIn >= 7) {
      refundPercent = 0.7; // 70% refund
    } else if (daysUntilCheckIn < 2) {
      refundPercent = 0.0; // No refund if within 48h
    }

    const paidAmount =
      booking.paymentType === "advance"
        ? booking.pricing.advanceAmount
        : booking.pricing.totalAmount;
    const refundAmount = Math.round(paidAmount * refundPercent);

    bookings[index] = {
      ...booking,
      status: "cancelled",
      cancellationRefund: refundAmount,
      paymentStatus: refundAmount > 0 ? "refunded" : booking.paymentStatus,
    };
    saveStore(bookings);
    return { booking: bookings[index], refundAmount };
  },
};
