"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { showToast } from "@/hooks/useToast";

export function Footer() {
  const [email, setEmail] = React.useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email", "Provide a valid email address.", "error");
      return;
    }
    showToast(
      "Benvenuto to VillaOne Private Gazette",
      "You have been added to our private bespoke travel newsletter.",
      "success"
    );
    setEmail("");
  };

  return (
    <footer className="bg-sand/80 border-t border-stone-soft/30 pt-16 pb-12 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-soft/20">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-serif text-3xl font-bold tracking-tight text-cypress">
                VillaOne
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold mb-1" />
            </Link>
            <p className="text-sm text-stone-soft leading-relaxed max-w-sm">
              Handcrafted Italian luxury villa stays across India. Experience private infinity pools, master chefs, and discreet concierge hospitality.
            </p>
            <div className="pt-2 text-xs text-stone-soft space-y-1">
              <p>Mumbai Concierge: {siteConfig.contact.addressMumbai}</p>
              <p>Goa Atelier: {siteConfig.contact.addressGoa}</p>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-cypress mb-4">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              {siteConfig.destinations.slice(0, 6).map((dest) => (
                <li key={dest}>
                  <Link
                    href={`/villas?destination=${dest.toLowerCase()}`}
                    className="text-stone-soft hover:text-cypress transition-colors"
                  >
                    {dest} Luxury Villas
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-cypress mb-4">
              Curations
            </h4>
            <ul className="space-y-2 text-xs text-stone-soft">
              <li><Link href="/villas?category=beachfront" className="hover:text-cypress">Amalfi Beachfront</Link></li>
              <li><Link href="/villas?category=hillstation" className="hover:text-cypress">Tuscan Hill Stations</Link></li>
              <li><Link href="/villas?category=luxurypool" className="hover:text-cypress">Lake Como Style Pools</Link></li>
              <li><Link href="/villas?category=heritage" className="hover:text-cypress">Historic Palazzos</Link></li>
              <li><Link href="/offers" className="hover:text-cypress">Seasonal Privileges</Link></li>
              <li><Link href="/partner" className="text-gold-dark font-medium hover:text-cypress">List Your Villa (Partner)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-cypress mb-4">
              Private Gazette
            </h4>
            <p className="text-xs text-stone-soft mb-3 leading-relaxed">
              Curated architectural stories, secret destinations, and seasonal privileges.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/90 border border-stone-soft/30 rounded-lg px-3 py-2 text-xs text-charcoal placeholder:text-stone-soft focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-cypress text-ivory rounded-md hover:bg-cypress-dark transition-colors"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-soft">
          <p>© {new Date().getFullYear()} VillaOne Luxury Hospitality LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-charcoal transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-charcoal transition-colors">Terms of Stay</Link>
            <Link href="/faq" className="hover:text-charcoal transition-colors">FAQ</Link>
            <Link href="/admin" className="text-stone-soft/60 hover:text-cypress transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
