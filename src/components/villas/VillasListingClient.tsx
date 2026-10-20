"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Villa } from "@/types";
import { villaService } from "@/services/villaService";
import { VillaGrid } from "./VillaGrid";
import { VillaFiltersSidebar, FilterState } from "./VillaFiltersSidebar";
import { VillaFilterDrawer } from "./VillaFilterDrawer";
import { VillaSortDropdown } from "./VillaSortDropdown";
import { VillaActiveChips } from "./VillaActiveChips";
import { Button } from "@/components/ui/Button";

interface VillasListingClientProps {
  initialVillas: Villa[];
}

export function VillasListingClient({ initialVillas }: VillasListingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [villas, setVillas] = React.useState<Villa[]>(initialVillas);
  const [visibleCount, setVisibleCount] = React.useState(6);
  const [sort, setSort] = React.useState<string>(searchParams.get("sort") || "popular");

  const filters: FilterState = React.useMemo(() => ({
    destination: searchParams.get("destination") || "all",
    category: searchParams.get("category") || "all",
    maxPrice: Number(searchParams.get("maxPrice")) || 100000,
    guests: Number(searchParams.get("guests")) || 1,
    bedrooms: Number(searchParams.get("bedrooms")) || 1,
    amenities: searchParams.getAll("amenities"),
  }), [searchParams]);

  React.useEffect(() => {
    villaService.getVillas({
      destination: filters.destination,
      category: filters.category,
      maxPrice: filters.maxPrice,
      guests: filters.guests,
      bedrooms: filters.bedrooms,
      amenities: filters.amenities,
      sortBy: sort as "price-asc" | "price-desc" | "rating" | "popular",
      checkIn: searchParams.get("checkIn") || undefined,
      checkOut: searchParams.get("checkOut") || undefined,
    }).then(setVillas);
  }, [filters, sort, searchParams]);

  const updateFilters = (updates: Partial<FilterState>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (updates.destination) {
      if (updates.destination === "all") {
        params.delete("destination");
      } else {
        params.set("destination", updates.destination);
      }
    }
    if (updates.category) {
      if (updates.category === "all") {
        params.delete("category");
      } else {
        params.set("category", updates.category);
      }
    }
    if (updates.maxPrice) params.set("maxPrice", updates.maxPrice.toString());
    if (updates.guests) params.set("guests", updates.guests.toString());
    if (updates.bedrooms) params.set("bedrooms", updates.bedrooms.toString());
    if (updates.amenities) {
      params.delete("amenities");
      updates.amenities.forEach((a) => params.append("amenities", a));
    }
    router.push(`/villas?${params.toString()}`);
  };

  const handleRemoveChip = (key: string, val?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "amenity" && val) {
      const remaining = filters.amenities.filter((a) => a !== val);
      params.delete("amenities");
      remaining.forEach((a) => params.append("amenities", a));
    } else {
      params.delete(key);
    }
    router.push(`/villas?${params.toString()}`);
  };

  const handleReset = () => router.push("/villas");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-soft/20 gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal">All Villa Estates</h1>
          <p className="text-xs text-stone-soft mt-1">Showing {villas.length} luxury private sanctuaries</p>
        </div>

        <div className="flex items-center gap-3">
          <VillaFilterDrawer filters={filters} onChange={updateFilters} onReset={handleReset} totalCount={villas.length} />
          <VillaSortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      <VillaActiveChips filters={filters} onRemove={handleRemoveChip} onClearAll={handleReset} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="hidden lg:block lg:col-span-1 sticky top-28">
          <VillaFiltersSidebar filters={filters} onChange={updateFilters} onReset={handleReset} />
        </aside>

        <main className="lg:col-span-3 space-y-8">
          <VillaGrid villas={villas.slice(0, visibleCount)} onResetFilters={handleReset} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" />

          {visibleCount < villas.length && (
            <div className="text-center pt-6">
              <Button variant="outline" size="md" onClick={() => setVisibleCount((prev) => prev + 6)}>
                Load More Estates ({villas.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
