"use client";

import * as React from "react";
import { Payment } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PaymentsTableProps {
  payments: Payment[];
  onRefund: (id: string) => void;
}

export function PaymentsTable({ payments, onRefund }: PaymentsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-soft/20 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-stone-soft/20">
        <h3 className="font-serif text-xl font-bold text-charcoal">Financial Ledgers & Gateway Logs</h3>
        <p className="text-xs text-stone-soft">Track real-time transactions, card tokens, and refund operations</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand/40 border-b border-stone-soft/20 text-stone-soft uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Transaction Ref</th>
              <th className="py-3 px-4">Booking Ref</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-soft/15">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-sand/20 transition-colors">
                <td className="py-3 px-4 font-mono text-charcoal">{p.transactionRef}</td>
                <td className="py-3 px-4 font-mono font-bold text-cypress">{p.bookingCode}</td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-charcoal block">{p.customerName}</span>
                  <span className="text-[10px] text-stone-soft">{p.customerEmail}</span>
                </td>
                <td className="py-3 px-4 uppercase font-semibold text-stone-soft">{p.method}</td>
                <td className="py-3 px-4 font-serif font-bold text-charcoal">
                  {formatCurrency(p.amount)}
                </td>
                <td className="py-3 px-4">
                  {p.status === "success" && <Badge variant="success" size="sm">Settled</Badge>}
                  {p.status === "refunded" && <Badge variant="terracotta" size="sm">Refunded</Badge>}
                  {p.status === "pending" && <Badge variant="gold" size="sm">Pending</Badge>}
                </td>
                <td className="py-3 px-4 text-right">
                  {p.status === "success" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[11px] text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => onRefund(p.id)}
                    >
                      Process Refund
                    </Button>
                  )}
                  {p.status === "refunded" && (
                    <span className="text-[11px] text-stone-soft italic">Refunded</span>
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
