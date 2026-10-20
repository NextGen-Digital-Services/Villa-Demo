export const featureFlags = {
  enableAiConcierge: true,
  enableAdvancePaymentOption: true,
  enablePartnerPortal: true,
  enableSimulatedRazorpay: true,
  enableDynamicPricing: true,
};

export const businessRules = {
  currency: "INR",
  currencySymbol: "₹",
  gstTaxRate: 0.18, // 18% GST
  advancePaymentPercentage: 0.3, // 30% advance
  defaultCheckInTime: "14:00",
  defaultCheckOutTime: "11:00",
  freeCancellationDaysThreshold: 14,
  moderateCancellationDaysThreshold: 7,
};
