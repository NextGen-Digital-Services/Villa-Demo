import { Payment } from "@/types";

export const initialPayments: Payment[] = [
  {
    id: "pay-101",
    transactionRef: "TXN_VO_8741029",
    bookingId: "bk-101",
    bookingCode: "VO-782K9P",
    customerName: "Pooja Singhania",
    customerEmail: "pooja.s@example.com",
    amount: 52149,
    currency: "INR",
    method: "card",
    status: "success",
    cardLast4: "4242",
    createdAt: "2026-10-15T11:20:00Z",
  },
  {
    id: "pay-102",
    transactionRef: "TXN_VO_8741030",
    bookingId: "bk-102",
    bookingCode: "VO-914X7L",
    customerName: "Vikramaditya Roy",
    customerEmail: "vikram.roy@example.com",
    amount: 107220,
    currency: "INR",
    method: "upi",
    status: "success",
    upiId: "vikram.roy@oksbi",
    createdAt: "2026-10-16T14:45:00Z",
  },
];
