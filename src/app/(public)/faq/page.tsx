"use client";

import * as React from "react";
import { Accordion } from "@/components/ui/Accordion";

export default function FaqPage() {
  const faqItems = [
    {
      id: "f-1",
      title: "How does the 30% advance booking token work?",
      content: "To secure your reservation, you can pay a 30% advance token today using UPI, card, or net banking. The remaining 70% balance is payable seamlessly upon arrival at the villa during check-in.",
    },
    {
      id: "f-2",
      title: "Are private chefs and housekeeping included in the stay?",
      content: "All signature VillaOne estates include full-time estate butlers and housekeeping. Many estates also feature resident master chefs providing complimentary artisanal breakfasts and bespoke dinner menus.",
    },
    {
      id: "f-3",
      title: "What is the cancellation and refund policy?",
      content: "We provide flexible cancellation tiers. For flexible estates, receive a 100% full refund if cancelled up to 14 days before check-in. Between 7-14 days, a 50% refund is processed back to your original payment method.",
    },
    {
      id: "f-4",
      title: "Are the villas pet-friendly?",
      content: "Several of our Tuscan country retreats—including Il Giardino in Alibaug and Villa Costa d'Oro in Goa—feature extensive fenced lawns and welcome well-mannered pets. Filter by 'Pet Friendly' in the search bar.",
    },
    {
      id: "f-5",
      title: "Can we host private celebrations, weddings, or intimate dinners?",
      content: "Intimate private celebrations (up to estate capacity) are welcome at select villas with prior concierge coordination. Please contact our concierge desk in advance so our staff can prepare custom catering.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Inquiries & Protocol</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-charcoal">Frequently Asked Questions</h1>
        <p className="text-sm text-stone-soft leading-relaxed font-light">
          Everything you need to know about our reservation standards, private culinary care, and estate policies.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-soft/25 shadow-xs">
        <Accordion items={faqItems} defaultOpenId="f-1" />
      </div>
    </div>
  );
}
