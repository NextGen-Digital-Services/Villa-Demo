import { Villa, VillaCategory } from "@/types";
import { initialVillas } from "@/data/mockVillas";
import { getStoredItem, setStoredItem } from "@/lib/storage";

const STORAGE_KEY = "villaone_villas_store";

function getStore(): Villa[] {
  return getStoredItem<Villa[]>(STORAGE_KEY, initialVillas);
}

function saveStore(villas: Villa[]): void {
  setStoredItem(STORAGE_KEY, villas);
}

export interface VillaFilterParams {
  destination?: string;
  category?: VillaCategory | string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  bedrooms?: number;
  amenities?: string[];
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "rating" | "popular";
  checkIn?: string;
  checkOut?: string;
}

export const villaService = {
  async getAllVillas(): Promise<Villa[]> {
    return getStore();
  },

  async getVillas(params?: VillaFilterParams): Promise<Villa[]> {
    let villas = getStore();
    if (!params) return villas;

    if (params.search) {
      const q = params.search.toLowerCase();
      villas = villas.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.destination.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }
    if (params.destination && params.destination !== "all") {
      villas = villas.filter(
        (v) => v.destination.toLowerCase() === params.destination?.toLowerCase()
      );
    }
    if (params.category && params.category !== "all") {
      villas = villas.filter((v) => v.category === params.category);
    }
    if (params.minPrice) {
      villas = villas.filter((v) => v.pricePerNight >= (params.minPrice || 0));
    }
    if (params.maxPrice) {
      villas = villas.filter((v) => v.pricePerNight <= (params.maxPrice || 999999));
    }
    if (params.guests) {
      villas = villas.filter((v) => v.maxGuests >= (params.guests || 1));
    }
    if (params.bedrooms) {
      villas = villas.filter((v) => v.bedrooms >= (params.bedrooms || 1));
    }
    if (params.amenities && params.amenities.length > 0) {
      villas = villas.filter((v) =>
        params.amenities!.every((amenity) => v.amenities.includes(amenity))
      );
    }
    if (params.checkIn && params.checkOut) {
      villas = villas.filter((v) => {
        return !v.blockedDates.some(
          (d) => d >= params.checkIn! && d < params.checkOut!
        );
      });
    }

    if (params.sortBy === "price-asc") {
      villas.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (params.sortBy === "price-desc") {
      villas.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (params.sortBy === "rating") {
      villas.sort((a, b) => b.rating - a.rating);
    } else {
      villas.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return villas;
  },

  async getVillaBySlug(slug: string): Promise<Villa | null> {
    const villas = getStore();
    return villas.find((v) => v.slug === slug) || null;
  },

  async getFeaturedVillas(): Promise<Villa[]> {
    const villas = getStore();
    return villas.filter((v) => v.isFeatured).slice(0, 6);
  },

  async getRecommendedVillas(currentSlug?: string): Promise<Villa[]> {
    const villas = getStore();
    return villas.filter((v) => v.slug !== currentSlug).slice(0, 3);
  },

  async createVilla(data: Omit<Villa, "id" | "createdAt">): Promise<Villa> {
    const villas = getStore();
    const newVilla: Villa = {
      ...data,
      id: `v-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    saveStore([newVilla, ...villas]);
    return newVilla;
  },

  async updateVilla(id: string, updates: Partial<Villa>): Promise<Villa> {
    const villas = getStore();
    const index = villas.findIndex((v) => v.id === id);
    if (index === -1) throw new Error("Villa not found");
    const updated = { ...villas[index], ...updates };
    villas[index] = updated;
    saveStore(villas);
    return updated;
  },

  async deleteVilla(id: string): Promise<boolean> {
    const villas = getStore();
    const filtered = villas.filter((v) => v.id !== id);
    saveStore(filtered);
    return true;
  },

  async toggleDateBlock(villaId: string, date: string): Promise<Villa> {
    const villas = getStore();
    const v = villas.find((item) => item.id === villaId);
    if (!v) throw new Error("Villa not found");
    const exists = v.blockedDates.includes(date);
    const newBlocked = exists
      ? v.blockedDates.filter((d) => d !== date)
      : [...v.blockedDates, date].sort();
    return this.updateVilla(villaId, { blockedDates: newBlocked });
  },
};
