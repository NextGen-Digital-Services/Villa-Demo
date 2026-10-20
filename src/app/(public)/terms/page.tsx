import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Stay | VillaOne Luxury Hospitality",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-xs leading-relaxed text-charcoal/80">
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-gold-dark font-bold">Estate Rules</span>
        <h1 className="font-serif text-4xl font-semibold text-charcoal">Terms of Stay</h1>
        <p className="text-stone-soft">Last updated: October 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-soft/25 shadow-xs space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-charcoal">1. Check-In & Verification</h2>
          <p>
            Standard check-in is from 14:00 onwards. Check-out is strictly by 11:00 to allow our housekeeping staff to sanitize the estate for incoming parties. Government-recognized photo identification is mandatory for all adult guests upon arrival.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-charcoal">2. Advance Token & Final Settlement</h2>
          <p>
            Reservations secured with a 30% advance token require full payment of the remaining 70% balance plus any refundable security deposits at the moment of check-in, prior to villa handover.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-charcoal">3. Care of Historic Masonry & Grounds</h2>
          <p>
            Our estates feature antique Italian limestone, hand-carved arches, and manicured lawns. Guests agree to exercise reasonable care. Any deliberate damage or violation of quiet hours will result in security deposit forfeiture.
          </p>
        </section>
      </div>
    </div>
  );
}
