import * as React from "react";
import { ownerService } from "@/services/ownerService";
import { PartnerEarningsView } from "@/components/partner/PartnerEarningsView";

export default async function PartnerEarningsPage() {
  const owners = await ownerService.getOwners();
  const currentOwner = owners[0];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Financial Statements</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">Owner Settlements & Payouts</h1>
        <p className="text-xs text-stone-soft mt-1">Review disbursed net earnings and upcoming calendar transfers</p>
      </div>

      <PartnerEarningsView owner={currentOwner} />
    </div>
  );
}
