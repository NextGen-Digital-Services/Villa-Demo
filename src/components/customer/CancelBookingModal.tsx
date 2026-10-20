"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { Booking } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onConfirmCancel: (bookingId: string) => void;
  isCancelling?: boolean;
}

export function CancelBookingModal({
  isOpen,
  onClose,
  booking,
  onConfirmCancel,
  isCancelling = false,
}: CancelBookingModalProps) {
  if (!booking) return null;

  const paidAmount =
    booking.paymentType === "advance"
      ? booking.pricing.advanceAmount
      : booking.pricing.totalAmount;

  // Calculate estimated refund preview
  const checkIn = new Date(booking.checkInDate).getTime();
  const now = new Date().getTime();
  const daysUntil = (checkIn - now) / (1000 * 60 * 60 * 24);

  let refundPercent = 0.5;
  let reasonText = "Cancellation within 7-14 days window (50% refund)";
  if (daysUntil >= 14) {
    refundPercent = 1.0;
    reasonText = "Eligible for 100% full refund (> 14 days prior to check-in)";
  } else if (daysUntil < 2) {
    refundPercent = 0.0;
    reasonText = "Non-refundable window (< 48 hours to check-in)";
  }

  const estimatedRefund = Math.round(paidAmount * refundPercent);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Reservation"
      description={`Reference: ${booking.bookingCode} • ${booking.villaName}`}
      maxWidth="md"
    >
      <div className="space-y-5 text-xs">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{reasonText}</p>
            <p className="text-[11px] text-amber-800/80 leading-relaxed">
              Refunds are automatically processed to your original payment method in 3-5 business days.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-sand/40 border border-stone-soft/20 space-y-2">
          <div className="flex justify-between">
            <span className="text-stone-soft">Total Paid Today:</span>
            <span className="font-semibold text-charcoal">{formatCurrency(paidAmount)}</span>
          </div>
          <div className="flex justify-between text-emerald-700 font-bold text-sm pt-2 border-t border-stone-soft/20">
            <span>Estimated Refund:</span>
            <span>{formatCurrency(estimatedRefund)}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isCancelling}>
            Keep Reservation
          </Button>
          <Button
            variant="terracotta"
            size="sm"
            isLoading={isCancelling}
            onClick={() => onConfirmCancel(booking.id)}
          >
            Confirm Cancellation
          </Button>
        </div>
      </div>
    </Modal>
  );
}
