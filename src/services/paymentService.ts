import { Payment } from "@/types";
import { initialPayments } from "@/data/mockPayments";
import { getStoredItem, setStoredItem } from "@/lib/storage";

const STORAGE_KEY = "villaone_payments_store";

function getStore(): Payment[] {
  return getStoredItem<Payment[]>(STORAGE_KEY, initialPayments);
}

function saveStore(payments: Payment[]): void {
  setStoredItem(STORAGE_KEY, payments);
}

export const paymentService = {
  async getPayments(): Promise<Payment[]> {
    return getStore();
  },

  async createPayment(
    data: Omit<Payment, "id" | "transactionRef" | "createdAt"> & { transactionRef?: string }
  ): Promise<Payment> {
    const payments = getStore();
    const newPayment: Payment = {
      ...data,
      id: `pay-${Date.now()}`,
      transactionRef: data.transactionRef || `TXN_VO_${Math.floor(1000000 + Math.random() * 9000000)}`,
      createdAt: new Date().toISOString(),
    };
    saveStore([newPayment, ...payments]);
    return newPayment;
  },

  async processRefund(id: string, reason: string = "Customer request"): Promise<Payment> {
    const payments = getStore();
    const index = payments.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Payment record not found");

    const payment = payments[index];
    payments[index] = {
      ...payment,
      status: "refunded",
      refundAmount: payment.amount,
      refundReason: reason,
    };
    saveStore(payments);
    return payments[index];
  },
};
