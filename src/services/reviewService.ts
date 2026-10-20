import { Review } from "@/types";
import { initialReviews } from "@/data/mockReviews";
import { getStoredItem, setStoredItem } from "@/lib/storage";

const STORAGE_KEY = "villaone_reviews_store";

function getStore(): Review[] {
  return getStoredItem<Review[]>(STORAGE_KEY, initialReviews);
}

function saveStore(reviews: Review[]): void {
  setStoredItem(STORAGE_KEY, reviews);
}

export const reviewService = {
  async getReviews(villaSlug?: string): Promise<Review[]> {
    const reviews = getStore();
    if (!villaSlug) {
      return reviews.filter((r) => r.status === "approved");
    }
    return reviews.filter(
      (r) => r.villaSlug === villaSlug && r.status === "approved"
    );
  },

  async getAllReviews(): Promise<Review[]> {
    return getStore();
  },

  async createReview(data: Omit<Review, "id" | "createdAt">): Promise<Review> {
    const reviews = getStore();
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    saveStore([newReview, ...reviews]);
    return newReview;
  },

  async updateReviewStatus(
    id: string,
    status: "approved" | "pending" | "hidden"
  ): Promise<Review> {
    const reviews = getStore();
    const index = reviews.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Review not found");
    reviews[index] = { ...reviews[index], status };
    saveStore(reviews);
    return reviews[index];
  },

  async deleteReview(id: string): Promise<boolean> {
    const reviews = getStore();
    saveStore(reviews.filter((r) => r.id !== id));
    return true;
  },
};
