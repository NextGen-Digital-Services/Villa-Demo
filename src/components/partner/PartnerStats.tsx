import * as React from "react";
import { TrendingUp, Home, Calendar, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

interface PartnerStatsProps {
  villaCount: number;
  totalEarnings: number;
  pendingPayout: number;
}

export function PartnerStats({ villaCount, totalEarnings, pendingPayout }: PartnerStatsProps) {
  const stats = [
    { label: "My Listed Estates", value: villaCount.toString(), icon: <Home className="w-5 h-5 text-cypress" /> },
    { label: "Total Owner Earnings", value: formatCurrency(totalEarnings), icon: <TrendingUp className="w-5 h-5 text-gold-dark" /> },
    { label: "Next Scheduled Payout", value: formatCurrency(pendingPayout), icon: <Wallet className="w-5 h-5 text-emerald-700" /> },
    { label: "Commission Retained", value: "15%", icon: <Calendar className="w-5 h-5 text-stone-soft" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((s, idx) => (
        <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-soft/20 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-sand/60">{s.icon}</div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-soft">{s.label}</span>
            <p className="font-serif text-2xl font-bold text-charcoal">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
