"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface VillaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  villaName: string;
}

export function VillaLightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  villaName,
}: VillaLightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length, onClose]);

  if (!isOpen) return null;

  const prev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const next = () =>
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between text-white/80 z-10">
        <div>
          <h4 className="font-serif text-lg font-medium text-white">{villaName}</h4>
          <span className="text-xs text-stone-soft">
            Photo {currentIndex + 1} of {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          aria-label="Close photo gallery"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <button
          onClick={prev}
          className="absolute left-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white z-10 transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
          <Image
            src={images[currentIndex]}
            alt={`${villaName} - View ${currentIndex + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        <button
          onClick={next}
          className="absolute right-4 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white z-10 transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 overflow-x-auto py-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
              idx === currentIndex ? "border-gold scale-105" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
