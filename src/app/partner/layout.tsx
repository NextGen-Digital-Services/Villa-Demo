import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Home, PlusCircle, DollarSign, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Partner Portal | VillaOne Estate Owners",
  robots: { index: false, follow: false },
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col font-sans text-charcoal">
      <header className="bg-cypress text-ivory border-b border-cypress-dark sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-ivory">
              VillaOne
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-cypress-dark px-2.5 py-1 rounded">
              Partner Atelier
            </span>
          </div>

          <nav className="flex items-center gap-4 text-xs font-medium">
            <Link href="/partner" className="text-ivory/80 hover:text-ivory py-1 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" />
              <span>Overview</span>
            </Link>
            <Link href="/partner/list-villa" className="text-gold-light hover:text-white py-1 flex items-center gap-1.5">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>List an Estate</span>
            </Link>
            <Link href="/partner/earnings" className="text-ivory/80 hover:text-ivory py-1 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Earnings</span>
            </Link>
            <Link href="/" className="text-ivory/60 hover:text-white pl-4 border-l border-cypress-light flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
}
