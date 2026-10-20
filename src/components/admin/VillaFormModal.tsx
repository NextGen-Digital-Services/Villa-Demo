"use client";

import * as React from "react";
import Image from "next/image";
import { Villa, VillaCategory } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { standardAmenities } from "@/data/amenities";

interface VillaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  villa?: Villa | null;
  onSave: (villaData: Partial<Villa>) => void;
}

function VillaFormContent({
  villa,
  onClose,
  onSave,
}: {
  villa?: Villa | null;
  onClose: () => void;
  onSave: (villaData: Partial<Villa>) => void;
}) {
  const [name, setName] = React.useState(villa?.name || "");
  const [destination, setDestination] = React.useState(villa?.destination || "Goa");
  const [category, setCategory] = React.useState<VillaCategory>(villa?.category || "beachfront");
  const [price, setPrice] = React.useState(villa?.pricePerNight?.toString() || "50000");
  const [guests, setGuests] = React.useState(villa?.maxGuests?.toString() || "8");
  const [bedrooms, setBedrooms] = React.useState(villa?.bedrooms?.toString() || "4");
  const [bathrooms, setBathrooms] = React.useState(villa?.bathrooms?.toString() || "4");
  const [amenities, setAmenities] = React.useState<string[]>(villa?.amenities || ["pool", "wifi", "chef"]);
  const [images, setImages] = React.useState<string[]>(villa?.images || ["/images/categories/beachfront.jpg"]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      destination,
      category,
      pricePerNight: Number(price) || 50000,
      maxGuests: Number(guests) || 8,
      bedrooms: Number(bedrooms) || 4,
      bathrooms: Number(bathrooms) || 4,
      amenities,
      images,
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs">
        <Input label="Estate Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase text-stone-soft mb-1">Destination</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border rounded-lg p-2 bg-white text-xs">
              {["Goa", "Alibaug", "Lonavala", "Udaipur", "Jaipur", "Manali", "Kasauli", "Rishikesh"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-stone-soft mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as VillaCategory)} className="w-full border rounded-lg p-2 bg-white text-xs">
              {["beachfront", "hillstation", "luxurypool", "heritage", "family", "petfriendly"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <Input label="Price / Night (INR)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input label="Max Guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} />
          <Input label="Bedrooms" type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
          <Input label="Bathrooms" type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-stone-soft mb-1.5">Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-lg border bg-sand/30">
            {standardAmenities.map((a) => (
              <label key={a.id} className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={amenities.includes(a.id)} onChange={() => setAmenities((prev) => prev.includes(a.id) ? prev.filter((i) => i !== a.id) : [...prev, a.id])} />
                <span>{a.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-stone-soft mb-1">Upload Villa Photos</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full border rounded-lg p-2 bg-white text-xs" />
          <div className="flex gap-2 mt-2 overflow-x-auto py-1">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border">
                <Image src={img} alt="Thumb" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" size="sm">Save Villa</Button>
        </div>
      </form>
  );
}

export function VillaFormModal({ isOpen, onClose, villa, onSave }: VillaFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={villa ? "Edit Estate" : "Add New Villa"} maxWidth="2xl">
      <VillaFormContent key={villa?.id || "new"} villa={villa} onClose={onClose} onSave={onSave} />
    </Modal>
  );
}
