# VillaOne — Luxury Italian-Style Villa Booking Platform

VillaOne is a luxury villa booking platform bringing timeless Italian craftsmanship, Tuscan masonry, Lake Como grandeur, and authentic Mediterranean hospitality to India's most exclusive destinations (Goa, Alibaug, Lonavala, Udaipur, Jaipur, Manali, Kasauli, and Rishikesh).

---

## 🏛️ Brand & Design Philosophy

- **Sprezzatura (Effortless Elegance):** Clean typographic hierarchy, warm organic textures, subtle borders, and deliberate micro-interactions.
- **Curated Color Palette:**
  - **Ivory (`#FAF6EE`):** Warm, soft background avoiding harsh pure whites.
  - **Sand (`#EFE6D6`):** Natural limestone and travertino accents.
  - **Cypress (`#2F3E2E`):** Deep Tuscan cypress green for primary actions.
  - **Terracotta (`#B5654A`):** Earthy clay accents and badge highlights.
  - **Gold (`#B8975A`):** Refined metallic accents and privilege indicators.
  - **Charcoal (`#1F1D1A`):** Deep volcanic slate for high-contrast typography.
  - **Stone (`#8A8378`):** Subdued captions and metadata.
- **Typography:**
  - Headings: `Cormorant Garamond` (editorial serif)
  - Body & UI: `Manrope` (modern geometric sans)

---

## 🚀 Mandatory Tech Stack

- **Framework:** Next.js 16.4 (App Router & Turbopack)
- **Language:** TypeScript 5 (Strict Mode ON)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **Images & Fonts:** `next/image` with responsive `sizes` & `next/font`

---

## 📏 Architecture & The 150-Line Component Rule

Every file in `src/` strictly adheres to a maximum of **150 lines** to enforce modularity, separation of concerns, and clean architectural boundaries.
- **Verification Script:**
  ```bash
  python3 -c "
  import os
  for root, _, files in os.walk('src'):
      for f in files:
          if f.endswith(('.ts', '.tsx')):
              p = os.path.join(root, f)
              with open(p) as fl:
                  n = len(fl.readlines())
                  if n > 150: print(f'{p}: {n} lines')
  "
  ```
  *(155 files scanned — 100% compliant)*

---

## 🗂️ Project Directory Structure

```text
src/
├── app/
│   ├── (public)/                 # Guest public routes
│   │   ├── page.tsx              # Luxury Homepage
│   │   ├── villas/               # Listing & Search with multi-faceted filters
│   │   ├── villas/[slug]/        # Detailed Estate showcase (Lightbox, Map, Amenities)
│   │   ├── booking/[slug]/       # 2-step reservation & checkout
│   │   ├── booking/confirmation/ # Voucher confirmation & print voucher
│   │   ├── login/ & register/    # Authentication portals (with 1-click demo logins)
│   │   ├── my-bookings/          # Client dashboard with cancellation & refund flows
│   │   ├── profile/              # Guest preferences & details
│   │   ├── offers/ & faq/        # Privileges, promotional codes, and stay FAQs
│   │   └── about/, contact/, etc # Story & legal terms
│   ├── admin/                    # Concierge management portal
│   │   ├── page.tsx              # Executive KPI dashboard & SVG financial charts
│   │   ├── villas/               # Estate inventory manager with add/edit modal
│   │   ├── availability/         # Interactive calendar date blocking
│   │   ├── bookings/             # Reservation directory
│   │   ├── customers/            # High-net-worth client profiles
│   │   ├── offers/               # Promotional privilege coupons
│   │   └── payments/             # Gateway transaction ledgers & refunds
│   ├── partner/                  # Villa Owners / Host portal
│   │   ├── page.tsx              # Estate performance & status
│   │   ├── list-villa/           # Multi-step property onboarding form
│   │   └── earnings/             # Payout statements & commission breakdown
│   ├── layout.tsx                # Root layout with fonts, header, footer & toast
│   ├── globals.css               # Design tokens and custom scrollbars
│   ├── sitemap.ts & robots.ts    # Dynamic SEO manifests
│   └── not-found.tsx & error.tsx # Premium fallback screens
├── components/
│   ├── ui/                       # Atomic UI primitives (Button, Input, Modal, Badge...)
│   ├── layout/                   # Header, Footer, WhatsApp floating concierge, AI Concierge
│   ├── home/                     # Hero, Search, Categories, Curated Carousels, Reviews
│   ├── villas/                   # Filters, Grid, Lightbox, Facts, Amenities, Dining, Map
│   ├── booking/                  # Step-based checkout, simulated Razorpay modal, Vouchers
│   ├── customer/                 # Bookings list, card items, cancel booking modal
│   ├── admin/                    # Admin KPI cards, SVG charts, data tables, date manager
│   └── partner/                  # Host stats, earnings tables, listing steps
├── services/                     # Mock data access layer (ready for backend swap)
│   ├── villaService.ts           # Estate fetching, filtering, blocking dates
│   ├── bookingService.ts         # Booking creation, status changes, refund calculation
│   ├── paymentService.ts         # Simulated transactions & refund ledgers
│   ├── offerService.ts           # Promotional validation & coupon management
│   ├── reviewService.ts          # Guest review queries & ratings
│   ├── customerService.ts        # Customer records
│   ├── ownerService.ts           # Partner owner profiles & earnings
│   └── authService.ts            # Authentication session management
├── hooks/                        # useAuth, useBookingPrice, useLocalStorage, useToast...
├── types/                        # Strict TypeScript interfaces for all domain models
└── data/                         # Initial seeds & 14 real Indian estate manifests
```

---

## 💳 Simulated Payment & Interactive Checkout

- **Flexible Payment Types:**
  - **Pay 30% Advance:** Secures reservation, remainder due at check-in.
  - **Pay 100% Full:** Immediate complete settlement.
- **Simulated Payment Gateway:**
  - Mock interactive Razorpay modal with tabs for **UPI** (GPay, PhonePe, Paytm, QR code), **Credit/Debit Card** (auto-formatting number, expiry, CVV), and **Netbanking** (HDFC, ICICI, SBI, Axis).
  - Simulates network latency (1.2s), emits realistic transaction IDs (`TXN_VO_XXXXXXX`), and immediately redirects to the personalized booking confirmation voucher.
- **Client Cancellation Engine:**
  - Automated refund calculation according to the estate's policy:
    - *Flexible:* 100% refund up to 14 days prior, 50% thereafter.
    - *Moderate:* 100% refund up to 30 days prior, 70% up to 14 days.
    - *Strict:* 100% within 48h of booking, 50% thereafter.

---

## 🔑 One-Click Demo Accounts

Visit `/login` to sign in instantly with one click:
1. **Client / Discerning Guest:** `pooja.s@example.com` (redirects to `/my-bookings`)
2. **Concierge Director / Admin:** `admin@villaone.luxury` (redirects to `/admin`)
3. **Estate Owner / Partner:** `partner@villaone.luxury` (redirects to `/partner`)

---

## 🔌 Swapping the Mock Layer for a Real Backend

The frontend was designed with clean architectural decoupling. The UI components communicate exclusively with service files in `src/services/`.

To replace the `localStorage` mock layer with a live backend (Supabase, PostgreSQL, REST, or GraphQL):
1. **No changes to UI components or pages are needed.**
2. Open `src/services/<serviceName>.ts`.
3. Replace the local storage reader/writer functions with `fetch()` calls to your REST/GraphQL API or Supabase client:
   ```typescript
   // Example: Switching villaService.ts to Supabase
   import { supabase } from "@/lib/supabaseClient";

   export const villaService = {
     async getAllVillas(): Promise<Villa[]> {
       const { data, error } = await supabase.from("villas").select("*");
       if (error) throw error;
       return data;
     },
     // ...
   };
   ```

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Code Quality & Build Verification
```bash
npm run lint         # Runs ESLint (0 errors, 0 warnings)
npx tsc --noEmit     # Validates TypeScript types (0 errors)
npm run build        # Generates production build
```

---

## 📄 License & Intellectual Property

Proprietary frontend implementation built for VillaOne Luxury Hospitality. All rights reserved.

