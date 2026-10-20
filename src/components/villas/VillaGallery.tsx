"use client";

import * as React from "react";
import Image from "next/image";
import { Grid } from "lucide-react";
import { VillaLightbox } from "./VillaLightbox";

interface VillaGalleryProps {
  images: string[];
  villaName: string;
}

export function VillaGallery({ images, villaName }: VillaGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState(0);

  const displayImages = images && images.length > 0 ? images : ["/images/hero/hero_main.jpg"];

  const openPhoto = (idx: number) => {
    setSelectedPhotoIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="relative rounded-3xl overflow-hidden shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-3 h-[380px] sm:h-[480px]">
          {/* Main Large Image */}
          <div
            className="md:col-span-2 relative h-full cursor-pointer overflow-hidden group"
            onClick={() => openPhoto(0)}
          >
            <Image
              src={displayImages[0]}
              alt={`${villaName} - Principal exterior`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>

          {/* 4 Small Grid Images */}
          <div className="hidden md:grid col-span-2 grid-cols-2 gap-2 sm:gap-3 h-full">
            {displayImages.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="relative h-full cursor-pointer overflow-hidden group"
                onClick={() => openPhoto(idx + 1)}
              >
                <Image
                  src={img}
                  alt={`${villaName} - View ${idx + 2}`}
                  fill
                  sizes="25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* View All Photos Button */}
        <button
          onClick={() => openPhoto(0)}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-charcoal font-semibold text-xs tracking-wider uppercase backdrop-blur-md shadow-lg transition-all hover:scale-105"
        >
          <Grid className="w-3.5 h-3.5 text-gold-dark" />
          <span>View All {displayImages.length} Photos</span>
        </button>
      </div>

      <VillaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={displayImages}
        initialIndex={selectedPhotoIndex}
        villaName={villaName}
      />
    </>
  );
}
