import { OfferCoupon } from "@/types";
import { initialOffers } from "@/data/mockOffers";
import { getStoredItem, setStoredItem } from "@/lib/storage";

const STORAGE_KEY = "villaone_offers_store";

function getStore(): OfferCoupon[] {
  return getStoredItem<OfferCoupon[]>(STORAGE_KEY, initialOffers);
}

function saveStore(offers: OfferCoupon[]): void {
  setStoredItem(STORAGE_KEY, offers);
}

export const offerService = {
  async getOffers(onlyActive = true): Promise<OfferCoupon[]> {
    const offers = getStore();
    return onlyActive ? offers.filter((o) => o.isActive) : offers;
  },

  async validateCoupon(
    code: string,
    amount: number
  ): Promise<{
    valid: boolean;
    discountAmount: number;
    message: string;
    coupon?: OfferCoupon;
  }> {
    const offers = getStore();
    const coupon = offers.find(
      (o) => o.code.toUpperCase() === code.trim().toUpperCase()
    );

    if (!coupon || !coupon.isActive) {
      return { valid: false, discountAmount: 0, message: "Invalid or expired coupon code" };
    }

    if (amount < coupon.minBookingAmount) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Requires minimum booking amount of ₹${coupon.minBookingAmount.toLocaleString("en-IN")}`,
      };
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.round((amount * coupon.discountValue) / 100);
      if (coupon.maxDiscountCap && discount > coupon.maxDiscountCap) {
        discount = coupon.maxDiscountCap;
      }
    } else {
      discount = coupon.discountValue;
    }

    return {
      valid: true,
      discountAmount: discount,
      message: `Coupon applied! You saved ₹${discount.toLocaleString("en-IN")}`,
      coupon,
    };
  },

  async createOffer(offer: Omit<OfferCoupon, "id">): Promise<OfferCoupon> {
    const offers = getStore();
    const newOffer: OfferCoupon = { ...offer, id: `off-${Date.now()}` };
    saveStore([newOffer, ...offers]);
    return newOffer;
  },

  async updateOffer(id: string, updates: Partial<OfferCoupon>): Promise<OfferCoupon> {
    const offers = getStore();
    const index = offers.findIndex((o) => o.id === id);
    if (index === -1) throw new Error("Offer not found");
    offers[index] = { ...offers[index], ...updates };
    saveStore(offers);
    return offers[index];
  },

  async deleteOffer(id: string): Promise<boolean> {
    const offers = getStore();
    saveStore(offers.filter((o) => o.id !== id));
    return true;
  },
};
