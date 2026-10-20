import * as React from "react";
import { Clock, ShieldAlert, Check } from "lucide-react";
import { HouseRules } from "@/types";

interface VillaRulesProps {
  rules: HouseRules;
  cancellationPolicy: "flexible" | "moderate" | "strict";
}

export function VillaRules({ rules, cancellationPolicy }: VillaRulesProps) {
  const policyDescriptions = {
    flexible: "Full 100% refund up to 14 days before check-in. 50% refund up to 7 days before check-in.",
    moderate: "Full 100% refund up to 30 days before check-in. 70% refund up to 14 days before check-in.",
    strict: "Full 100% refund within 48 hours of booking if check-in is at least 14 days away. 50% refund thereafter.",
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl font-semibold text-charcoal mb-4">
          House Rules & Timings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-stone-soft/20 bg-white/70 space-y-2">
            <div className="flex items-center gap-2 text-cypress">
              <Clock className="w-4 h-4" />
              <span className="font-semibold text-xs uppercase tracking-wider">Timings</span>
            </div>
            <p className="text-xs text-charcoal">Check-in: <span className="font-semibold">{rules.checkInTime}</span></p>
            <p className="text-xs text-charcoal">Check-out: <span className="font-semibold">{rules.checkOutTime}</span></p>
            <p className="text-xs text-stone-soft">Quiet Hours: {rules.quietHours}</p>
          </div>

          <div className="p-4 rounded-xl border border-stone-soft/20 bg-white/70 space-y-2">
            <div className="flex items-center gap-2 text-gold-dark">
              <ShieldAlert className="w-4 h-4" />
              <span className="font-semibold text-xs uppercase tracking-wider">Cancellation Policy</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal capitalize">
              {cancellationPolicy} Policy
            </p>
            <p className="text-xs text-stone-soft leading-relaxed">
              {policyDescriptions[cancellationPolicy]}
            </p>
          </div>
        </div>
      </div>

      {rules.additionalRules && rules.additionalRules.length > 0 && (
        <div className="p-4 rounded-xl bg-sand/30 border border-stone-soft/20 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">Estate Guidelines</span>
          <ul className="space-y-1.5 text-xs text-stone-soft">
            {rules.additionalRules.map((rule, idx) => (
              <li key={idx} className="flex items-center gap-2 text-charcoal/90">
                <Check className="w-3.5 h-3.5 text-cypress shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
