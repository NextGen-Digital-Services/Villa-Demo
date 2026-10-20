"use client";

import { useMemo } from "react";
import { PricingBreakdown } from "@/types";
import { calculateNights } from "@/lib/formatters";
import { businessRules } from "@/config/features";

interface UseBookingPriceProps {
  ratePerNight: number;
  cleaningFee?: number;
  checkInDate: string;
  checkOutDate: string;
  discountAmount?: number;
  couponCode?: string;
}

export function useBookingPrice({
  ratePerNight,
  cleaningFee = 3500,
  checkInDate,
  checkOutDate,
  discountAmount = 0,
  couponCode,
}: UseBookingPriceProps): PricingBreakdown {
  return useMemo(() => {
    const nights = calculateNights(checkInDate, checkOutDate);
    const baseAmount = ratePerNight * nights;
    const taxableAmount = Math.max(0, baseAmount + cleaningFee - discountAmount);
    const serviceTaxGst = Math.round(taxableAmount * businessRules.gstTaxRate);
    const totalAmount = Math.max(0, baseAmount + cleaningFee + serviceTaxGst - discountAmount);
    const advanceAmount = Math.round(
      totalAmount * businessRules.advancePaymentPercentage
    );
    const dueAtCheckIn = totalAmount - advanceAmount;

    return {
      nights,
      ratePerNight,
      baseAmount,
      cleaningFee,
      serviceTaxGst,
      discountAmount,
      totalAmount,
      advanceAmount,
      dueAtCheckIn,
      couponCodeApplied: couponCode,
    };
  }, [
    ratePerNight,
    cleaningFee,
    checkInDate,
    checkOutDate,
    discountAmount,
    couponCode,
  ]);
}
