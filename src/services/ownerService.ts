import { OwnerPartner } from "@/types";
import { initialOwners } from "@/data/mockOwners";
import { getStoredItem, setStoredItem } from "@/lib/storage";

const STORAGE_KEY = "villaone_owners_store";

function getStore(): OwnerPartner[] {
  return getStoredItem<OwnerPartner[]>(STORAGE_KEY, initialOwners);
}

function saveStore(owners: OwnerPartner[]): void {
  setStoredItem(STORAGE_KEY, owners);
}

export const ownerService = {
  async getOwners(): Promise<OwnerPartner[]> {
    return getStore();
  },

  async getOwnerById(id: string): Promise<OwnerPartner | null> {
    const owners = getStore();
    return owners.find((o) => o.id === id) || null;
  },

  async updateEarnings(ownerId: string, bookingAmount: number): Promise<OwnerPartner> {
    const owners = getStore();
    const index = owners.findIndex((o) => o.id === ownerId);
    if (index === -1) throw new Error("Owner not found");

    const owner = owners[index];
    const commission = (bookingAmount * owner.commissionRate) / 100;
    const netOwnerEarnings = bookingAmount - commission;

    owners[index] = {
      ...owner,
      totalEarnings: owner.totalEarnings + netOwnerEarnings,
      pendingPayout: owner.pendingPayout + netOwnerEarnings,
    };
    saveStore(owners);
    return owners[index];
  },

  async createOwner(owner: Omit<OwnerPartner, "id" | "joinedDate">): Promise<OwnerPartner> {
    const owners = getStore();
    const newOwner: OwnerPartner = {
      ...owner,
      id: `own-${Date.now()}`,
      joinedDate: new Date().toISOString().split("T")[0],
    };
    saveStore([newOwner, ...owners]);
    return newOwner;
  },
};
