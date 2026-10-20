import * as React from "react";
import { ListVillaForm } from "@/components/partner/ListVillaForm";

export default function PartnerListVillaPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">New Portfolio Enrollment</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">Enroll Your Private Villa</h1>
        <p className="text-xs text-stone-soft mt-1">Submit your architectural estate for VillaOne signature curation</p>
      </div>

      <ListVillaForm />
    </div>
  );
}
