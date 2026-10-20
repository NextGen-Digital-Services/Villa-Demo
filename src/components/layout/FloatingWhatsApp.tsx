"use client";

import * as React from "react";
import { MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20VillaOne%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20villa%20reservation.`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 hover:bg-[#20ba5a] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Chat with VillaOne Concierge on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>

      {showTooltip && (
        <div className="hidden sm:block bg-charcoal text-ivory text-xs px-3 py-2 rounded-lg shadow-lg border border-gold/20 animate-in fade-in duration-200 whitespace-nowrap">
          <p className="font-medium">Direct WhatsApp Concierge</p>
          <p className="text-[10px] text-stone-soft">Instant responses • 24/7 Service</p>
        </div>
      )}
    </div>
  );
}
