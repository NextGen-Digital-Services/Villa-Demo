export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  totalBookings: number;
  totalSpent: number;
  joinedDate: string;
  isVip: boolean;
  preferences: {
    preferredDestination?: string;
    dietaryRestrictions?: string;
    specialOccasions?: string;
  };
}
