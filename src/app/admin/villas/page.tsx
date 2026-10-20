"use client";

import * as React from "react";
import { Villa } from "@/types";
import { villaService } from "@/services/villaService";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { VillasTable } from "@/components/admin/VillasTable";
import { VillaFormModal } from "@/components/admin/VillaFormModal";
import { showToast } from "@/hooks/useToast";

export default function AdminVillasPage() {
  const [villas, setVillas] = React.useState<Villa[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingVilla, setEditingVilla] = React.useState<Villa | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const loadVillas = () => {
    villaService.getAllVillas().then((res) => {
      setVillas(res);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    loadVillas();
  }, []);

  const handleSaveVilla = async (data: Partial<Villa>) => {
    if (editingVilla) {
      await villaService.updateVilla(editingVilla.id, data);
      showToast("Villa Updated", `${data.name || editingVilla.name} updated successfully.`, "success");
    } else {
      await villaService.createVilla({
        ...data,
        slug: (data.name || "villa").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tagline: data.tagline || "Italian Luxury Sanctuary",
        description: data.description || "Authentic Italian architecture in India.",
        story: data.story || "A retreat designed for tranquility.",
        cleaningFee: 3500,
        securityDeposit: 25000,
        areaSqFt: 6000,
        rating: 5.0,
        reviewCount: 0,
        isFeatured: false,
        isAvailable: true,
        blockedDates: [],
        houseRules: {
          checkInTime: "14:00",
          checkOutTime: "11:00",
          quietHours: "23:00 - 08:00",
          petsAllowed: true,
          smokingAllowed: false,
          partiesAllowed: false,
          additionalRules: [],
        },
        foodOptions: {
          chefAvailable: true,
          breakfastIncluded: true,
          cuisines: ["Italian", "Continental"],
          description: "Chef available.",
        },
        cancellationPolicy: "moderate",
        ownerId: "own-1",
        location: {
          latitude: 15.6,
          longitude: 73.7,
          address: "Estate Avenue",
          city: data.destination || "Goa",
          state: data.destination || "Goa",
          googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843!2d73.7!3d15.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDM2JzA3LjkiTiA3M8KwNDQnMTcuMiJF!5e0!3m2!1sen!2sin!4v1600000000000",
        },
      } as Omit<Villa, "id" | "createdAt">);
      showToast("Villa Added", `${data.name} added to the portfolio.`, "success");
    }
    setIsModalOpen(false);
    setEditingVilla(null);
    loadVillas();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this estate from the catalog?")) {
      await villaService.deleteVilla(id);
      showToast("Villa Removed", "Estate deleted from store.", "info");
      loadVillas();
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Villa Portfolio Management"
        subtitle="Catalog of private luxury estates, pricing, and amenities"
      />

      {loading ? (
        <div className="py-20 text-center font-serif italic text-stone-soft">Loading catalog...</div>
      ) : (
        <VillasTable
          villas={villas}
          onEdit={(v) => {
            setEditingVilla(v);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
          onAddNew={() => {
            setEditingVilla(null);
            setIsModalOpen(true);
          }}
        />
      )}

      <VillaFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingVilla(null);
        }}
        villa={editingVilla}
        onSave={handleSaveVilla}
      />
    </div>
  );
}
