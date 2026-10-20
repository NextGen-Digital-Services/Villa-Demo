import * as React from "react";
import { Customer } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-soft/20 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-stone-soft/20">
        <h3 className="font-serif text-xl font-bold text-charcoal">Client Profiles & VIP Guests</h3>
        <p className="text-xs text-stone-soft">Historical guest spending, preferred regions, and stays</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand/40 border-b border-stone-soft/20 text-stone-soft uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Client Name</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Preferred Region</th>
              <th className="py-3 px-4">Total Stays</th>
              <th className="py-3 px-4">Lifetime Spend</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-soft/15">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-sand/20 transition-colors">
                <td className="py-3 px-4 font-semibold text-charcoal">{c.name}</td>
                <td className="py-3 px-4 text-stone-soft">
                  <div>{c.email}</div>
                  <div className="text-[10px]">{c.phone}</div>
                </td>
                <td className="py-3 px-4 text-charcoal font-medium">
                  {c.preferences.preferredDestination || "Pan-India"}
                </td>
                <td className="py-3 px-4 font-bold text-charcoal">{c.totalBookings} Stays</td>
                <td className="py-3 px-4 font-serif font-bold text-cypress">
                  {formatCurrency(c.totalSpent)}
                </td>
                <td className="py-3 px-4">
                  {c.isVip ? (
                    <Badge variant="gold" size="sm">VIP Member</Badge>
                  ) : (
                    <Badge variant="sand" size="sm">Standard</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
