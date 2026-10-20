"use client";

import * as React from "react";
import { Payment } from "@/types";
import { paymentService } from "@/services/paymentService";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PaymentsTable } from "@/components/admin/PaymentsTable";
import { showToast } from "@/hooks/useToast";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadPayments = () => {
    paymentService.getPayments().then((res) => {
      setPayments(res);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    loadPayments();
  }, []);

  const handleRefund = async (id: string) => {
    if (confirm("Are you sure you want to process a full refund for this transaction?")) {
      await paymentService.processRefund(id, "Administrative clearance");
      showToast("Refund Processed", "Transaction status updated to refunded.", "info");
      loadPayments();
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Financial Transactions & Receipts"
        subtitle="Gateway transaction records, UPI references, and refund processing"
      />

      {loading ? (
        <div className="py-20 text-center font-serif italic text-stone-soft">Loading ledgers...</div>
      ) : (
        <PaymentsTable payments={payments} onRefund={handleRefund} />
      )}
    </div>
  );
}
