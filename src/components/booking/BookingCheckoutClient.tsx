"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Villa, GuestDetails, PaymentMethod, PaymentType } from "@/types";
import { useBookingPrice } from "@/hooks/useBookingPrice";
import { bookingService } from "@/services/bookingService";
import { paymentService } from "@/services/paymentService";
import { showToast } from "@/hooks/useToast";
import { BookingTripSummary } from "./BookingTripSummary";
import { GuestDetailsStep } from "./GuestDetailsStep";
import { PaymentMethodStep } from "./PaymentMethodStep";
import { SimulatedRazorpayModal } from "./SimulatedRazorpayModal";

interface BookingCheckoutClientProps {
  villa: Villa;
}

export function BookingCheckoutClient({ villa }: BookingCheckoutClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = React.useState<number>(1);
  const [payType, setPayType] = React.useState<PaymentType>(
    (searchParams.get("payType") as PaymentType) || "advance"
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("upi");

  const checkIn = searchParams.get("checkIn") || "2026-11-15";
  const checkOut = searchParams.get("checkOut") || "2026-11-18";
  const guests = Number(searchParams.get("guests")) || 2;
  const coupon = searchParams.get("coupon") || "";

  const pricing = useBookingPrice({
    ratePerNight: villa.pricePerNight,
    cleaningFee: villa.cleaningFee,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    couponCode: coupon,
  });

  const [guestDetails, setGuestDetails] = React.useState<GuestDetails>({
    firstName: "Pooja",
    lastName: "Singhania",
    email: "pooja.s@example.com",
    phone: "9820111223",
    specialRequests: "",
    dietaryPreferences: "",
  });

  const handleGuestSubmit = (details: GuestDetails) => {
    setGuestDetails(details);
    setStep(2);
  };

  const handleInitiatePayment = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = async (txnId: string) => {
    setIsModalOpen(false);
    const amountPaid = payType === "advance" ? pricing.advanceAmount : pricing.totalAmount;

    const newBooking = await bookingService.createBooking({
      villaId: villa.id,
      villaSlug: villa.slug,
      villaName: villa.name,
      villaImage: villa.images[0] || "/images/hero/hero_main.jpg",
      locationCity: villa.destination,
      customerId: "cust-1",
      customerDetails: guestDetails,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests: { adults: guests, children: 0, infants: 0, pets: 0 },
      pricing,
      paymentType: payType,
      paymentStatus: payType === "advance" ? "partial" : "paid",
      status: "confirmed",
    });

    await paymentService.createPayment({
      transactionRef: txnId,
      bookingId: newBooking.id,
      bookingCode: newBooking.bookingCode,
      customerName: `${guestDetails.firstName} ${guestDetails.lastName}`,
      customerEmail: guestDetails.email,
      amount: amountPaid,
      currency: "INR",
      method: paymentMethod,
      status: "success",
    });

    showToast("Booking Confirmed!", `Confirmation sent to ${guestDetails.email} and WhatsApp.`, "success");
    router.push(`/booking/confirmation/${newBooking.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Secure Reservation Atelier</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">Complete Your Booking</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          {step === 1 && (
            <GuestDetailsStep initialDetails={guestDetails} onSubmit={handleGuestSubmit} />
          )}
          {step === 2 && (
            <PaymentMethodStep
              pricing={pricing}
              payType={payType}
              onPayTypeChange={setPayType}
              onInitiatePayment={handleInitiatePayment}
              onBack={() => setStep(1)}
            />
          )}
        </div>

        <div className="lg:col-span-5 sticky top-24">
          <BookingTripSummary
            villa={villa}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            pricing={pricing}
            payType={payType}
          />
        </div>
      </div>

      <SimulatedRazorpayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={payType === "advance" ? pricing.advanceAmount : pricing.totalAmount}
        villaName={villa.name}
        method={paymentMethod}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
