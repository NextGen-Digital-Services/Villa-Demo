export const siteConfig = {
  name: "VillaOne",
  tagline: "Italian Elegance, Handpicked Luxury Stays across India",
  description:
    "Experience the soul of Tuscany, Lake Como, and the Amalfi Coast in India's finest private villas. Curated estates with private infinity pools, master chefs, and bespoke Italian hospitality.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://villaone.luxury",
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || "+91 98765 43210",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
    email: process.env.NEXT_PUBLIC_EMAIL || "concierge@villaone.luxury",
    addressMumbai: "Suite 402, Altamount Road, Mumbai, Maharashtra 400026",
    addressGoa: "Villa Bella, Assagao, North Goa 403507",
  },
  nav: [
    { label: "Villas", href: "/villas" },
    { label: "Destinations", href: "/villas?view=destinations" },
    { label: "Offers", href: "/offers" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  destinations: [
    "Goa",
    "Alibaug",
    "Lonavala",
    "Udaipur",
    "Jaipur",
    "Manali",
    "Kasauli",
    "Rishikesh",
  ],
  socials: {
    instagram: "https://instagram.com/villaone.luxury",
    facebook: "https://facebook.com/villaone.luxury",
    linkedin: "https://linkedin.com/company/villaone-luxury",
  },
};
