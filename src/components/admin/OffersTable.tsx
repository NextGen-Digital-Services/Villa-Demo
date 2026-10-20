"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { OfferCoupon } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";

interface OffersTableProps {
  offers: OfferCoupon[];
  onToggleActive: (id: string, active: boolean) => void;
  onCreateOffer: (offer: Omit<OfferCoupon, "id">) => void;
  onDeleteOffer: (id: string) => void;
}

export function OffersTable({ offers, onToggleActive, onCreateOffer, onDeleteOffer }: OffersTableProps) {
  const [isCreating, setIsCreating] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [discountVal, setDiscountVal] = React.useState("10");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !title) return;
    onCreateOffer({
      code: code.toUpperCase(),
      title,
      description: `${title} luxury promotional code`,
      discountType: "percentage",
      discountValue: Number(discountVal),
      minBookingAmount: 50000,
      validUntil: "2026-12-31",
      isActive: true,
      terms: ["Valid on all standard villa bookings"],
    });
    setCode("");
    setTitle("");
    setIsCreating(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-soft/20 shadow-xs overflow-hidden space-y-4">
      <div className="p-5 border-b border-stone-soft/20 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-charcoal">Promotional Privileges & Coupons</h3>
          <p className="text-xs text-stone-soft">Manage client privilege codes and seasonal rate credits</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsCreating(true)} className="gap-1.5 font-bold">
          <Plus className="w-4 h-4" />
          <span>New Coupon</span>
        </Button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="p-4 mx-5 bg-sand/30 rounded-xl border flex flex-wrap gap-3 items-end text-xs">
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase text-stone-soft">Code</label>
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="e.g. VIP20" className="border rounded-md px-3 py-1.5 bg-white uppercase font-bold" required />
          </div>
          <div className="space-y-1 flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold uppercase text-stone-soft">Campaign Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Spring Escape Privilege" className="border rounded-md px-3 py-1.5 bg-white w-full" required />
          </div>
          <div className="space-y-1 w-24">
            <label className="block text-[10px] font-bold uppercase text-stone-soft">Discount %</label>
            <input type="number" value={discountVal} onChange={(e) => setDiscountVal(e.target.value)} className="border rounded-md px-3 py-1.5 bg-white w-full" required />
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button type="submit" variant="primary" size="sm">Save Code</Button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand/40 border-b border-stone-soft/20 text-stone-soft uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Coupon Code</th>
              <th className="py-3 px-4">Privilege Name</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Min. Spend</th>
              <th className="py-3 px-4">Expiry</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-soft/15">
            {offers.map((o) => (
              <tr key={o.id} className="hover:bg-sand/20 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-cypress">{o.code}</td>
                <td className="py-3 px-4 font-semibold text-charcoal">{o.title}</td>
                <td className="py-3 px-4 font-bold text-terracotta">
                  {o.discountType === "percentage" ? `${o.discountValue}%` : `₹${o.discountValue.toLocaleString("en-IN")}`}
                </td>
                <td className="py-3 px-4 text-stone-soft">{formatCurrency(o.minBookingAmount)}</td>
                <td className="py-3 px-4 text-stone-soft">{formatDate(o.validUntil)}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onToggleActive(o.id, !o.isActive)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer ${
                      o.isActive ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {o.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => onDeleteOffer(o.id)} className="p-1.5 text-stone-soft hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
