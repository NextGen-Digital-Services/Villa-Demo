export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type PaymentType = "advance" | "full";

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  dietaryPreferences?: string;
  idProofType?: string;
}

export interface PricingBreakdown {
  nights: number;
  ratePerNight: number;
  baseAmount: number;
  cleaningFee: number;
  serviceTaxGst: number;
  discountAmount: number;
  totalAmount: number;
  advanceAmount: number;
  dueAtCheckIn: number;
  couponCodeApplied?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  villaId: string;
  villaSlug: string;
  villaName: string;
  villaImage: string;
  locationCity: string;
  customerId: string;
  customerDetails: GuestDetails;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  guests: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  pricing: PricingBreakdown;
  paymentType: PaymentType;
  paymentId?: string;
  paymentStatus: "paid" | "partial" | "refunded" | "failed";
  status: BookingStatus;
  cancellationRefund?: number;
  createdAt: string;
}
