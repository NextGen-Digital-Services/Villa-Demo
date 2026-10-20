export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const staticImages = {
  hero: {
    src: "/images/hero/hero_main.jpg",
    alt: "VillaOne Italian luxury estate in golden hour light with infinity pool and cypress trees",
    width: 1920,
    height: 1080,
  },
  categories: {
    beachfront: {
      src: "/images/categories/beachfront.jpg",
      alt: "Amalfi-style luxury beachfront villa with private sun deck overlooking turquoise water",
      width: 1200,
      height: 900,
    },
    hillstation: {
      src: "/images/categories/hillstation.jpg",
      alt: "Tuscan-inspired mountain villa perched atop mist-covered pine hills",
      width: 1200,
      height: 900,
    },
    luxurypool: {
      src: "/images/categories/luxurypool.jpg",
      alt: "Lake Como style Italian luxury villa with heated infinity pool and sun loungers",
      width: 1200,
      height: 900,
    },
    heritage: {
      src: "/images/categories/heritage.jpg",
      alt: "Grand Italian Renaissance palazzo with carved stone arches and fountain courtyard",
      width: 1200,
      height: 900,
    },
    family: {
      src: "/images/categories/family.jpg",
      alt: "Sprawling Italian family villa estate with manicured gardens and dining pergola",
      width: 1200,
      height: 900,
    },
    petfriendly: {
      src: "/images/categories/petfriendly.jpg",
      alt: "Pet-friendly Tuscan country estate with sprawling green lawn and stone facade",
      width: 1200,
      height: 900,
    },
  },
  about: {
    story: {
      src: "/images/about/about_story.jpg",
      alt: "VillaOne heritage courtyard with ancient olive tree, stone fountain, and wrought iron gate",
      width: 1920,
      height: 1080,
    },
  },
  reviews: {
    avatar1: {
      src: "/images/reviews/avatar1.jpg",
      alt: "Pooja Singhania, Verified VillaOne Guest",
      width: 400,
      height: 400,
    },
    avatar2: {
      src: "/images/reviews/avatar2.jpg",
      alt: "Vikramaditya Roy, Verified VillaOne Guest",
      width: 400,
      height: 400,
    },
  },
};

export function getVillaImages(slug: string): ImageData[] {
  return [
    { src: `/images/villas/${slug}/01.jpg`, alt: `${slug} - Grand Italian exterior facade` },
    { src: `/images/villas/${slug}/02.jpg`, alt: `${slug} - Private infinity pool and sun deck` },
    { src: `/images/villas/${slug}/03.jpg`, alt: `${slug} - High-ceiling salon and fireplace lounge` },
    { src: `/images/villas/${slug}/04.jpg`, alt: `${slug} - Master suite with panoramic private terrace` },
    { src: `/images/villas/${slug}/05.jpg`, alt: `${slug} - Al fresco dining pergola with garden views` },
    { src: `/images/villas/${slug}/06.jpg`, alt: `${slug} - Sun-drenched courtyard and grounds` },
  ];
}
