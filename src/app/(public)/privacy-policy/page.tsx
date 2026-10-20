import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VillaOne Luxury Hospitality",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-xs leading-relaxed text-charcoal/80">
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-gold-dark font-bold">Legal Standards</span>
        <h1 className="font-serif text-4xl font-semibold text-charcoal">Privacy Policy</h1>
        <p className="text-stone-soft">Last updated: October 2026</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-soft/25 shadow-xs space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-charcoal">1. Information Collection & Discretion</h2>
          <p>
            VillaOne Hospitality LLP collects only information required to provide discreet, bespoke luxury stays. This includes your name, verified phone/WhatsApp number, email address, dietary requirements, and government identification presented for villa gate security.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-charcoal">2. Financial Data Protection</h2>
          <p>
            All electronic payments, UPI tokens, and credit card authorizations are handled through PCI-DSS Level 1 compliant gateway partners (including simulated and live Razorpay systems). VillaOne does not store full credit card numbers or banking passwords on internal servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-charcoal">3. Guest Anonymity</h2>
          <p>
            We respect the privacy of high-profile, VIP, and celebrity guests. Private chef logs and itinerary details remain strictly confidential and are expunged upon guest checkout.
          </p>
        </section>
      </div>
    </div>
  );
}
