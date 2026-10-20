export interface OwnerPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  villaCount: number;
  totalEarnings: number;
  pendingPayout: number;
  bankAccount: {
    accountHolder: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  commissionRate: number; // e.g. 15 for 15%
  joinedDate: string;
}
