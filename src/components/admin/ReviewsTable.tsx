"use client";

import * as React from "react";
import { Star, Check, EyeOff, Trash2 } from "lucide-react";
import { Review } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface ReviewsTableProps {
  reviews: Review[];
  onUpdateStatus: (id: string, status: "approved" | "hidden") => void;
  onDelete: (id: string) => void;
}

export function ReviewsTable({ reviews, onUpdateStatus, onDelete }: ReviewsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-soft/20 shadow-xs overflow-hidden">
      <div className="p-5 border-b border-stone-soft/20">
        <h3 className="font-serif text-xl font-bold text-charcoal">Guest Reviews & Moderation</h3>
        <p className="text-xs text-stone-soft">Approve testimonials before publication or moderate feedback</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand/40 border-b border-stone-soft/20 text-stone-soft uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Estate Slug</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Review Excerpt</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-soft/15">
            {reviews.map((r) => (
              <tr key={r.id} className="hover:bg-sand/20 transition-colors">
                <td className="py-3 px-4 font-semibold text-charcoal">{r.authorName}</td>
                <td className="py-3 px-4 text-stone-soft font-mono text-[11px]">{r.villaSlug}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 font-bold text-charcoal">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    {r.rating}
                  </span>
                </td>
                <td className="py-3 px-4 max-w-xs truncate text-stone-soft">{r.comment}</td>
                <td className="py-3 px-4">
                  <Badge variant={r.status === "approved" ? "success" : "sand"} size="sm">
                    {r.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  {r.status !== "approved" ? (
                    <button onClick={() => onUpdateStatus(r.id, "approved")} className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded" title="Approve">
                      <Check className="w-4 h-4" />
                    </button>
                  ) : (
                    <button onClick={() => onUpdateStatus(r.id, "hidden")} className="p-1.5 text-stone-soft hover:text-charcoal rounded" title="Hide">
                      <EyeOff className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => onDelete(r.id)} className="p-1.5 text-stone-soft hover:text-red-600 rounded" title="Delete">
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
