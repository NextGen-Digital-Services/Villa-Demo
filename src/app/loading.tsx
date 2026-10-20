import * as React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-2 border-stone-soft/30 border-t-gold animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center font-serif text-xs font-bold text-cypress">
          V1
        </div>
      </div>
      <p className="font-serif italic text-sm text-stone-soft tracking-wider animate-pulse">
        Curating Luxury Experience...
      </p>
    </div>
  );
}
