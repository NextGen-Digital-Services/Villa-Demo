import { OwnerPartner } from "@/types";

export const initialOwners: OwnerPartner[] = [
  {
    id: "own-1",
    name: "Conte Alessandro Rossi & Rhea Kapoor",
    email: "partner@villaone.luxury",
    phone: "+91 98200 44556",
    villaCount: 4,
    totalEarnings: 3450000,
    pendingPayout: 175000,
    bankAccount: {
      accountHolder: "Rossi Luxury Hospitality LLP",
      accountNumber: "50200034981245",
      ifscCode: "HDFC0000060",
      bankName: "HDFC Bank, Fort Branch, Mumbai",
    },
    commissionRate: 15,
    joinedDate: "2024-11-01",
  },
  {
    id: "own-2",
    name: "Siddharth & Gayatri Singhania",
    email: "siddharth.s@estates.luxury",
    phone: "+91 98201 88990",
    villaCount: 3,
    totalEarnings: 2180000,
    pendingPayout: 94000,
    bankAccount: {
      accountHolder: "Singhania Retreats Pvt Ltd",
      accountNumber: "00110200004921",
      ifscCode: "ICIC0000011",
      bankName: "ICICI Bank, Nariman Point, Mumbai",
    },
    commissionRate: 15,
    joinedDate: "2025-01-15",
  },
];
