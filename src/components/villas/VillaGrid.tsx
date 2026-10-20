import * as React from "react";
import { Villa } from "@/types";
import { VillaCard } from "./VillaCard";
import { EmptyState } from "@/components/shared/EmptyState";

interface VillaGridProps {
  villas: Villa[];
  onResetFilters?: () => void;
  className?: string;
}

export function VillaGrid({
  villas,
  onResetFilters,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
}: VillaGridProps) {
  if (villas.length === 0) {
    return (
      <div className="col-span-full py-8">
        <EmptyState
          title="No Villas Found"
          description="We couldn't find any estates matching your specific criteria. Try adjusting your destinations, price range, or amenities."
          actionLabel="Reset All Filters"
          onAction={onResetFilters}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {villas.map((villa, idx) => (
        <VillaCard key={villa.id} villa={villa} priority={idx < 3} />
      ))}
    </div>
  );
}
