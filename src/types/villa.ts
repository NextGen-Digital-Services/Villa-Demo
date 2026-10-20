export type VillaCategory =
  | "beachfront"
  | "hillstation"
  | "luxurypool"
  | "heritage"
  | "family"
  | "petfriendly";

export interface Amenity {
  id: string;
  name: string;
  iconName: string;
  category: "luxury" | "comfort" | "outdoor" | "dining" | "wellness";
}

export interface HouseRules {
  checkInTime: string;
  checkOutTime: string;
  quietHours: string;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  partiesAllowed: boolean;
  additionalRules: string[];
}

export interface FoodOptions {
  chefAvailable: boolean;
  breakfastIncluded: boolean;
  cuisines: string[];
  description: string;
  pricePerDayPerPerson?: number;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  googleMapEmbedUrl: string;
}

export interface Villa {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  location: LocationCoordinates;
  destination: string;
  category: VillaCategory;
  pricePerNight: number;
  cleaningFee: number;
  securityDeposit: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isAvailable: boolean;
  blockedDates: string[]; // ISO date strings: 'YYYY-MM-DD'
  houseRules: HouseRules;
  foodOptions: FoodOptions;
  cancellationPolicy: "flexible" | "moderate" | "strict";
  ownerId: string;
  createdAt: string;
}
