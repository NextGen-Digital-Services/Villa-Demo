import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { staticImages } from "@/data/images";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function CategoryGrid() {
  const categories = [
    {
      id: "beachfront",
      title: "Amalfi Beachfront",
      tagline: "Seafront pavilions & private cliffs",
      image: staticImages.categories.beachfront.src,
      href: "/villas?category=beachfront",
    },
    {
      id: "hillstation",
      title: "Tuscan Hill Stations",
      tagline: "Mist-covered pines & stone fireplaces",
      image: staticImages.categories.hillstation.src,
      href: "/villas?category=hillstation",
    },
    {
      id: "luxurypool",
      title: "Lake Como Pools",
      tagline: "Heated infinity & cantilevered waters",
      image: staticImages.categories.luxurypool.src,
      href: "/villas?category=luxurypool",
    },
    {
      id: "heritage",
      title: "Heritage Palazzos",
      tagline: "Carved marble courtyards & historic grace",
      image: staticImages.categories.heritage.src,
      href: "/villas?category=heritage",
    },
    {
      id: "family",
      title: "Tuscan Family Estates",
      tagline: "Olive groves & sprawling manicured lawns",
      image: staticImages.categories.family.src,
      href: "/villas?category=family",
    },
    {
      id: "petfriendly",
      title: "Pet Friendly Retreats",
      tagline: "Fenced acres & welcoming grounds",
      image: staticImages.categories.petfriendly.src,
      href: "/villas?category=petfriendly",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Architectural Curations"
        title="Find Your Italian Aesthetic"
        description="Every estate in the VillaOne portfolio is thoughtfully curated around distinct regional Italian architectural styles."
        centered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-5/4 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gold-light font-bold">
                  Curated Collection
                </span>
                <h3 className="font-serif text-2xl font-semibold leading-tight group-hover:text-gold-light transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/80 font-light">
                  {cat.tagline}
                </p>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold group-hover:text-charcoal transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
