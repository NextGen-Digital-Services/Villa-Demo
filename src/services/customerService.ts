import { Customer } from "@/types";
import { initialCustomers } from "@/data/mockCustomers";
import { getStoredItem, setStoredItem } from "@/lib/storage";

const STORAGE_KEY = "villaone_customers_store";

function getStore(): Customer[] {
  return getStoredItem<Customer[]>(STORAGE_KEY, initialCustomers);
}

function saveStore(customers: Customer[]): void {
  setStoredItem(STORAGE_KEY, customers);
}

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    return getStore();
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    const customers = getStore();
    return customers.find((c) => c.id === id) || null;
  },

  async getCustomerByEmail(email: string): Promise<Customer | null> {
    const customers = getStore();
    return customers.find((c) => c.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    const customers = getStore();
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Customer not found");
    customers[index] = { ...customers[index], ...updates };
    saveStore(customers);
    return customers[index];
  },

  async recordBookingSpend(id: string, amount: number): Promise<Customer> {
    const customers = getStore();
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Customer not found");
    const c = customers[index];
    customers[index] = {
      ...c,
      totalBookings: c.totalBookings + 1,
      totalSpent: c.totalSpent + amount,
    };
    saveStore(customers);
    return customers[index];
  },
};
