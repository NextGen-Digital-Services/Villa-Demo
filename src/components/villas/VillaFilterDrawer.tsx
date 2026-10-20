"use client";

import * as React from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { VillaFiltersSidebar, FilterState } from "./VillaFiltersSidebar";
import { Button } from "@/components/ui/Button";

interface VillaFilterDrawerProps {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  onReset: () => void;
  totalCount: number;
}

export function VillaFilterDrawer({
  filters,
  onChange,
  onReset,
  totalCount,
}: VillaFilterDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sand border border-stone-soft/30 text-xs font-semibold uppercase tracking-wider text-charcoal hover:bg-stone-light"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-h-[85vh] bg-ivory rounded-t-3xl p-6 shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-stone-soft/20">
              <h3 className="font-serif text-xl font-bold text-charcoal">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-sand text-stone-soft hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <VillaFiltersSidebar
                filters={filters}
                onChange={onChange}
                onReset={onReset}
                className="p-0 border-0 bg-transparent"
              />
            </div>

            <div className="pt-4 border-t border-stone-soft/20">
              <Button
                variant="primary"
                size="md"
                className="w-full font-bold"
                onClick={() => setIsOpen(false)}
              >
                View {totalCount} {totalCount === 1 ? "Estate" : "Estates"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
