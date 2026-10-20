export interface RatingCategoryBreakdown {
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  value: number;
}

export interface Review {
  id: string;
  villaId: string;
  villaSlug: string;
  authorName: string;
  authorLocation: string;
  authorAvatar?: string;
  rating: number;
  stayDate: string;
  comment: string;
  categories: RatingCategoryBreakdown;
  isVerifiedGuest: boolean;
  status: "approved" | "pending" | "hidden";
  createdAt: string;
}
