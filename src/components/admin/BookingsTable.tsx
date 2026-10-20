"use client";

import * as React from "react";
import { Booking, BookingStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface BookingsTableProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: BookingStatus) => void;
}

export function BookingsTable({ bookings, onUpdateStatus }: BookingsTableProps) {
  const [filter, setFilter] = React.useState<string>("all");
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const statusBadges = {
    confirmed: <Badge variant="success" size="sm">Confirmed</Badge>,
    pending: <Badge variant="gold" size="sm">Pending</Badge>,
    completed: <Badge variant="cypress" size="sm">Completed</Badge>,
    cancelled: <Badge variant="terracotta" size="sm">Cancelled</Badge>,
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-soft/20 shadow-xs overflow-hidden space-y-4">
      <div className="p-5 border-b border-stone-soft/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-charcoal">All Bookings & Reservations</h3>
          <p className="text-xs text-stone-soft">Manage guest stays, payments, and check-in clearances</p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto text-xs">
          {["all", "confirmed", "pending", "completed", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                filter === st ? "bg-cypress text-ivory" : "bg-sand/60 text-charcoal hover:bg-sand"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand/40 border-b border-stone-soft/20 text-stone-soft uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Guest</th>
              <th className="py-3 px-4">Estate</th>
              <th className="py-3 px-4">Stay Dates</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-soft/15">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-sand/20 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-cypress">{b.bookingCode}</td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-charcoal block">{b.customerDetails.firstName} {b.customerDetails.lastName}</span>
                  <span className="text-[10px] text-stone-soft">{b.customerDetails.phone}</span>
                </td>
                <td className="py-3 px-4 font-medium text-charcoal">{b.villaName}</td>
                <td className="py-3 px-4 text-stone-soft">
                  {formatDate(b.checkInDate)} &ndash; {formatDate(b.checkOutDate)}
                </td>
                <td className="py-3 px-4 font-serif font-bold text-charcoal">
                  {formatCurrency(b.pricing.totalAmount)}
                </td>
                <td className="py-3 px-4">{statusBadges[b.status]}</td>
                <td className="py-3 px-4 text-right space-x-1.5">
                  <button onClick={() => setSelectedBooking(b)} className="px-2 py-1 rounded bg-sand hover:bg-stone-light text-charcoal text-[11px] font-semibold">
                    View
                  </button>
                  {b.status === "pending" && (
                    <button onClick={() => onUpdateStatus(b.id, "confirmed")} className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-semibold">
                      Confirm
                    </button>
                  )}
                  {b.status === "confirmed" && (
                    <button onClick={() => onUpdateStatus(b.id, "completed")} className="px-2 py-1 rounded bg-cypress/10 hover:bg-cypress/20 text-cypress text-[11px] font-semibold">
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <Modal isOpen={!!selectedBooking} onClose={() => setSelectedBooking(null)} title="Booking Dossier" maxWidth="md">
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-sand/40 border space-y-1">
              <p><strong>Guest:</strong> {selectedBooking.customerDetails.firstName} {selectedBooking.customerDetails.lastName}</p>
              <p><strong>Email:</strong> {selectedBooking.customerDetails.email}</p>
              <p><strong>Phone:</strong> {selectedBooking.customerDetails.phone}</p>
              <p><strong>Special Requests:</strong> {selectedBooking.customerDetails.specialRequests || "None"}</p>
            </div>
            <div className="p-3 rounded-xl bg-sand/40 border space-y-1">
              <p><strong>Dates:</strong> {formatDate(selectedBooking.checkInDate)} to {formatDate(selectedBooking.checkOutDate)}</p>
              <p><strong>Amount:</strong> {formatCurrency(selectedBooking.pricing.totalAmount)}</p>
              <p><strong>Payment Mode:</strong> {selectedBooking.paymentType === "advance" ? "30% Advance Token" : "100% Full Payment"}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
