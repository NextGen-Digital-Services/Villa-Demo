import * as React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function NewsletterCta() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-cypress text-ivory p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-gold-light font-semibold">
            Dedicated Concierge Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Planning a Milestone Celebration or Family Gathering?
          </h2>
          <p className="text-sm text-ivory/80 leading-relaxed font-light">
            Our private concierge atelier will customize a bespoke itinerary, private chef menu, and luxury transport suited specifically to your party.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20VillaOne%20Concierge,%20I%20would%20like%20to%20plan%20a%20bespoke%20villa%20stay.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="lg" className="font-semibold text-charcoal">
                <MessageSquare className="w-4 h-4 mr-2" />
                Speak to Concierge
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-ivory/40 text-ivory hover:bg-ivory/10">
                Submit Inquiry Form
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}
