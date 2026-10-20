"use client";

import * as React from "react";
import { CreditCard, QrCode, Building2 } from "lucide-react";
import { PaymentMethod, PricingBreakdown } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";

interface PaymentMethodStepProps {
  pricing: PricingBreakdown;
  payType: "advance" | "full";
  onPayTypeChange: (type: "advance" | "full") => void;
  onInitiatePayment: (method: PaymentMethod, meta?: Record<string, string>) => void;
  onBack: () => void;
}

export function PaymentMethodStep({
  pricing,
  payType,
  onPayTypeChange,
  onInitiatePayment,
  onBack,
}: PaymentMethodStepProps) {
  const [selectedMethod, setSelectedMethod] = React.useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = React.useState("guest@okhdfcbank");
  const [selectedBank, setSelectedBank] = React.useState("HDFC Bank");

  const amountToPay = payType === "advance" ? pricing.advanceAmount : pricing.totalAmount;

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-soft/30 shadow-xs">
      <div>
        <h3 className="font-serif text-2xl font-semibold text-charcoal">Payment Authorization</h3>
        <p className="text-xs text-stone-soft mt-1">Select your preferred payment structure and method.</p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">Structure</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onPayTypeChange("advance")}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              payType === "advance" ? "border-cypress bg-cypress/5 ring-2 ring-cypress/20" : "border-stone-soft/30 hover:bg-sand"
            }`}
          >
            <div className="flex justify-between items-center mb-0.5">
              <span className="font-semibold text-xs text-charcoal">30% Advance</span>
              <span className="text-[9px] bg-cypress text-ivory px-2 py-0.5 rounded font-bold">Recommended</span>
            </div>
            <p className="font-serif text-base font-bold text-cypress">{formatCurrency(pricing.advanceAmount)}</p>
          </button>
          <button
            type="button"
            onClick={() => onPayTypeChange("full")}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              payType === "full" ? "border-cypress bg-cypress/5 ring-2 ring-cypress/20" : "border-stone-soft/30 hover:bg-sand"
            }`}
          >
            <span className="font-semibold text-xs text-charcoal block mb-0.5">100% Full Payment</span>
            <p className="font-serif text-base font-bold text-cypress">{formatCurrency(pricing.totalAmount)}</p>
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">Method</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "upi", label: "UPI & QR", icon: <QrCode className="w-4 h-4" /> },
            { id: "card", label: "Credit Card", icon: <CreditCard className="w-4 h-4" /> },
            { id: "netbanking", label: "Net Banking", icon: <Building2 className="w-4 h-4" /> },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMethod(m.id as PaymentMethod)}
              className={`flex flex-col items-center p-2.5 rounded-xl border text-xs gap-1 transition-all ${
                selectedMethod === m.id ? "border-gold bg-sand/60 text-charcoal font-bold" : "border-stone-soft/20 text-stone-soft hover:bg-sand"
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {selectedMethod === "upi" && (
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter VPA (e.g. yourname@okhdfcbank)"
            className="w-full bg-white border border-stone-soft/30 rounded-lg p-2.5 text-xs text-charcoal"
          />
        )}
        {selectedMethod === "netbanking" && (
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full bg-white border border-stone-soft/30 rounded-lg p-2.5 text-xs text-charcoal"
          >
            <option value="HDFC Bank">HDFC Bank</option>
            <option value="ICICI Bank">ICICI Bank</option>
            <option value="SBI">State Bank of India</option>
          </select>
        )}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-stone-soft/20">
        <Button type="button" variant="outline" size="sm" onClick={onBack}>Back</Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          className="font-bold px-6 shadow-md"
          onClick={() => onInitiatePayment(selectedMethod, { upiId, bankName: selectedBank })}
        >
          Pay {formatCurrency(amountToPay)} &rarr;
        </Button>
      </div>
    </div>
  );
}
