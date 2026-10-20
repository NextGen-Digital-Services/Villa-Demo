import * as React from "react";
import Link from "next/link";
import { bookingService } from "@/services/bookingService";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { KpiCards } from "@/components/admin/KpiCards";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { BookingsChart } from "@/components/admin/BookingsChart";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function AdminDashboardPage() {
  const bookings = await bookingService.getBookings();

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + b.pricing.totalAmount,
    0
  );
  const pendingAmount = bookings
    .filter((b) => b.paymentType === "advance")
    .reduce((sum, b) => sum + b.pricing.dueAtCheckIn, 0);

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Concierge Executive Dashboard"
        subtitle="Real-time occupancy metrics, financial volumes, and estate status"
      />

      <KpiCards
        totalBookings={bookings.length}
        totalRevenue={totalRevenue}
        occupancyRate={78}
        pendingAmount={pendingAmount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <BookingsChart />
      </div>

      <div className="bg-white rounded-2xl border border-stone-soft/20 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Recent Reservation Activity</h3>
            <p className="text-xs text-stone-soft">Latest bookings across all Indian regions</p>
          </div>
          <Link href="/admin/bookings">
            <Button variant="outline" size="sm">View All Bookings</Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sand/40 border-b border-stone-soft/20 text-stone-soft uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Guest</th>
                <th className="py-2.5 px-3">Estate</th>
                <th className="py-2.5 px-3">Dates</th>
                <th className="py-2.5 px-3">Total</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-soft/15">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-sand/20">
                  <td className="py-2.5 px-3 font-mono font-bold text-cypress">{b.bookingCode}</td>
                  <td className="py-2.5 px-3 font-semibold text-charcoal">{b.customerDetails.firstName} {b.customerDetails.lastName}</td>
                  <td className="py-2.5 px-3 font-medium text-charcoal">{b.villaName}</td>
                  <td className="py-2.5 px-3 text-stone-soft">{formatDate(b.checkInDate)} &ndash; {formatDate(b.checkOutDate)}</td>
                  <td className="py-2.5 px-3 font-serif font-bold text-charcoal">{formatCurrency(b.pricing.totalAmount)}</td>
                  <td className="py-2.5 px-3"><Badge variant="success" size="sm">{b.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
