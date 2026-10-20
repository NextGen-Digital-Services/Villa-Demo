import * as React from "react";
import { TrendingUp, Users, CalendarCheck, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

interface KpiCardsProps {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  pendingAmount: number;
}

export function KpiCards({
  totalBookings,
  totalRevenue,
  occupancyRate,
  pendingAmount,
}: KpiCardsProps) {
  const cards = [
    {
      label: "Total Bookings",
      value: totalBookings.toString(),
      trend: "+18% from last month",
      icon: <CalendarCheck className="w-5 h-5 text-cypress" />,
      bg: "bg-cypress/10",
    },
    {
      label: "Gross Platform Revenue",
      value: formatCurrency(totalRevenue),
      trend: "+24% season high",
      icon: <TrendingUp className="w-5 h-5 text-gold-dark" />,
      bg: "bg-gold/15",
    },
    {
      label: "Average Occupancy",
      value: `${occupancyRate}%`,
      trend: "Peak season pacing",
      icon: <Users className="w-5 h-5 text-terracotta" />,
      bg: "bg-terracotta/10",
    },
    {
      label: "Due at Check-In",
      value: formatCurrency(pendingAmount),
      trend: "Secured by card token",
      icon: <Clock className="w-5 h-5 text-stone-soft" />,
      bg: "bg-sand",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-white border border-stone-soft/20 shadow-xs flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-soft font-semibold">
              {c.label}
            </span>
            <div className={`p-2 rounded-xl ${c.bg}`}>{c.icon}</div>
          </div>
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              {c.value}
            </p>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              {c.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
