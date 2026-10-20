"use client";

import * as React from "react";
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { PaymentMethod } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";

interface SimulatedRazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  villaName: string;
  method: PaymentMethod;
  onSuccess: (paymentRef: string) => void;
}

export function SimulatedRazorpayModal({
  isOpen,
  onClose,
  amount,
  villaName,
  method,
  onSuccess,
}: SimulatedRazorpayModalProps) {
  const [status, setStatus] = React.useState<"idle" | "processing" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSimulatePayment = (willSucceed: boolean) => {
    setStatus("processing");
    setTimeout(() => {
      if (willSucceed) {
        setStatus("success");
        setTimeout(() => {
          onSuccess(`pay_${Math.floor(10000000 + Math.random() * 90000000)}`);
        }, 1200);
      } else {
        setStatus("error");
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-xs" onClick={status === "processing" ? undefined : onClose} />

      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-stone-soft/30 z-10 animate-in zoom-in-95 duration-200">
        {/* Razorpay Brand Bar */}
        <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#528FF0] flex items-center justify-center font-bold text-white text-lg">
              R
            </div>
            <div>
              <h4 className="font-semibold text-sm">VillaOne Luxury Estates</h4>
              <p className="text-[11px] text-white/70">Razorpay Trusted Checkout</p>
            </div>
          </div>
          <button onClick={onClose} disabled={status === "processing"} className="text-white/60 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-soft">Amount to Authorize</span>
            <p className="font-serif text-3xl font-bold text-charcoal">{formatCurrency(amount)}</p>
            <p className="text-xs text-stone-soft font-medium">{villaName} &bull; {method.toUpperCase()} Gateway</p>
          </div>

          {status === "processing" && (
            <div className="py-8 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-10 h-10 text-cypress animate-spin" />
              <p className="text-xs font-semibold text-charcoal">Securing encrypted bank token...</p>
              <p className="text-[11px] text-stone-soft">Do not refresh or close this window.</p>
            </div>
          )}

          {status === "success" && (
            <div className="py-8 flex flex-col items-center justify-center space-y-2 text-emerald-600">
              <CheckCircle2 className="w-12 h-12" />
              <h4 className="font-serif text-lg font-bold text-charcoal">Payment Approved</h4>
              <p className="text-xs text-stone-soft">Redirecting to your luxury voucher...</p>
            </div>
          )}

          {status === "error" && (
            <div className="py-4 space-y-4 text-center">
              <div className="flex flex-col items-center text-red-600 space-y-2">
                <AlertCircle className="w-10 h-10" />
                <h4 className="font-serif text-base font-bold text-charcoal">Simulated Transaction Declined</h4>
                <p className="text-xs text-stone-soft">Test card limit exceeded or bank timeout simulated.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full" onClick={() => setStatus("idle")}>Try Again</Button>
                <Button variant="primary" size="sm" className="w-full" onClick={() => handleSimulatePayment(true)}>Simulate Success</Button>
              </div>
            </div>
          )}

          {status === "idle" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-sand/30 border border-stone-soft/20 text-xs text-stone-soft leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Simulated Sandbox Environment: Select an outcome to test payment workflow.</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <Button variant="primary" size="lg" className="w-full font-bold shadow-md bg-emerald-700 hover:bg-emerald-800" onClick={() => handleSimulatePayment(true)}>
                  Simulate Successful Payment &rarr;
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs text-stone-soft" onClick={() => handleSimulatePayment(false)}>
                  Simulate Failed Payment (For UI Test)
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
