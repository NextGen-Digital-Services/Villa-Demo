"use client";

import * as React from "react";
import { OfferCoupon } from "@/types";
import { offerService } from "@/services/offerService";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { OffersTable } from "@/components/admin/OffersTable";
import { showToast } from "@/hooks/useToast";

export default function AdminOffersPage() {
  const [offers, setOffers] = React.useState<OfferCoupon[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadOffers = () => {
    offerService.getOffers(false).then((res) => {
      setOffers(res);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    loadOffers();
  }, []);

  const handleToggle = async (id: string, active: boolean) => {
    await offerService.updateOffer(id, { isActive: active });
    showToast("Coupon Updated", `Privilege code is now ${active ? "active" : "inactive"}.`, "info");
    loadOffers();
  };

  const handleCreate = async (data: Omit<OfferCoupon, "id">) => {
    await offerService.createOffer(data);
    showToast("Coupon Created", `Privilege code ${data.code} has been added.`, "success");
    loadOffers();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this promotional code?")) {
      await offerService.deleteOffer(id);
      showToast("Coupon Deleted", "Code has been removed.", "info");
      loadOffers();
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Promotions & Privileges"
        subtitle="Manage promotional discount coupons and direct booking incentives"
      />

      {loading ? (
        <div className="py-20 text-center font-serif italic text-stone-soft">Loading promotions...</div>
      ) : (
        <OffersTable
          offers={offers}
          onToggleActive={handleToggle}
          onCreateOffer={handleCreate}
          onDeleteOffer={handleDelete}
        />
      )}
    </div>
  );
}
