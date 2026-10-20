export type PaymentMethod = "upi" | "card" | "netbanking";

export interface Payment {
  id: string;
  transactionRef: string;
  bookingId: string;
  bookingCode: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: "success" | "pending" | "refunded" | "failed";
  cardLast4?: string;
  upiId?: string;
  bankName?: string;
  refundAmount?: number;
  refundReason?: string;
  createdAt: string;
}
