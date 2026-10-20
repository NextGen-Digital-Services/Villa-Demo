import { Customer } from "@/types";

export const initialCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Pooja Singhania",
    email: "pooja.s@example.com",
    phone: "+91 98201 11223",
    avatarUrl: "/images/reviews/avatar1.jpg",
    totalBookings: 3,
    totalSpent: 420000,
    joinedDate: "2025-06-10",
    isVip: true,
    preferences: {
      preferredDestination: "Goa",
      dietaryRestrictions: "Pescatarian",
      specialOccasions: "Wedding Anniversary (November)",
    },
  },
  {
    id: "cust-2",
    name: "Vikramaditya Roy",
    email: "vikram.roy@example.com",
    phone: "+91 98110 33445",
    avatarUrl: "/images/reviews/avatar2.jpg",
    totalBookings: 2,
    totalSpent: 285000,
    joinedDate: "2025-08-15",
    isVip: true,
    preferences: {
      preferredDestination: "Lonavala",
      dietaryRestrictions: "None",
      specialOccasions: "Birthday (September)",
    },
  },
];
