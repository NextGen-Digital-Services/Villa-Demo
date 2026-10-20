"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit2, Trash2, Eye, Star, Plus } from "lucide-react";
import { Villa } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface VillasTableProps {
  villas: Villa[];
  onEdit: (villa: Villa) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export function VillasTable({ villas, onEdit, onDelete, onAddNew }: VillasTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-soft/20 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-stone-soft/20 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-charcoal">Managed Villa Estates</h3>
          <p className="text-xs text-stone-soft">{villas.length} properties active in system</p>
        </div>
        <Button variant="primary" size="sm" onClick={onAddNew} className="gap-1.5 font-bold">
          <Plus className="w-4 h-4" />
          <span>Add New Villa</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand/40 border-b border-stone-soft/20 text-stone-soft uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Estate</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Nightly Rate</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Rooms</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-soft/15">
            {villas.map((v) => (
              <tr key={v.id} className="hover:bg-sand/20 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-sand shrink-0">
                    <Image src={v.images[0] || "/images/hero/hero_main.jpg"} alt={v.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block">{v.name}</span>
                    <span className="text-[10px] text-stone-soft">{v.slug}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-charcoal">{v.destination}</td>
                <td className="py-3 px-4">
                  <Badge variant="sand" size="sm">{v.category}</Badge>
                </td>
                <td className="py-3 px-4 font-serif font-bold text-charcoal">
                  {formatCurrency(v.pricePerNight)}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 font-semibold text-charcoal">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    {v.rating} ({v.reviewCount})
                  </span>
                </td>
                <td className="py-3 px-4 text-stone-soft">
                  {v.bedrooms} Bed &bull; {v.bathrooms} Bath
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <Link href={`/villas/${v.slug}`} target="_blank" className="p-1.5 text-stone-soft hover:text-cypress inline-block">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button onClick={() => onEdit(v)} className="p-1.5 text-stone-soft hover:text-gold-dark inline-block">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(v.id)} className="p-1.5 text-stone-soft hover:text-red-600 inline-block">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
