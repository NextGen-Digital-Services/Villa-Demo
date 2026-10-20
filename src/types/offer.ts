export type DiscountType = "percentage" | "flat";

export interface OfferCoupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number; // e.g. 15 for 15% or 5000 for ₹5,000 flat
  minBookingAmount: number;
  maxDiscountCap?: number;
  validUntil: string;
  isActive: boolean;
  terms: string[];
}
