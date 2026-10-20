"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Home, CalendarDays, BookOpen, Users,
  Tag, CreditCard, MessageSquare, Settings, ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Villas", href: "/admin/villas", icon: <Home className="w-4 h-4" /> },
    { label: "Availability", href: "/admin/availability", icon: <CalendarDays className="w-4 h-4" /> },
    { label: "Bookings", href: "/admin/bookings", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Customers", href: "/admin/customers", icon: <Users className="w-4 h-4" /> },
    { label: "Offers & Coupons", href: "/admin/offers", icon: <Tag className="w-4 h-4" /> },
    { label: "Payments", href: "/admin/payments", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Reviews", href: "/admin/reviews", icon: <MessageSquare className="w-4 h-4" /> },
    { label: "Settings", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-cypress text-ivory flex flex-col justify-between p-6 border-r border-cypress-dark shrink-0 min-h-screen">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-ivory">
            VillaOne
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-cypress-dark px-2 py-0.5 rounded">
            Admin
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all",
                  isActive
                    ? "bg-gold text-charcoal font-bold shadow-sm"
                    : "text-ivory/80 hover:bg-cypress-light hover:text-ivory"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-cypress-light">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-ivory/70 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Public Website</span>
        </Link>
      </div>
    </aside>
  );
}
