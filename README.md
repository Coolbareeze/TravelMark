# Travel Mark Ltd — Website

A premium, custom-built website for **Travel Mark Ltd**, a UK travel agency based in Birmingham. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components, SSR/ISR)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with a custom brand design system
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React + React Icons
- **Content:** Local JSON "CMS" (see [CMS & Admin Panel](#cms--admin-panel)) — architected to swap in Sanity or Payload with minimal changes

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin dashboard

Visit `/admin/login`. Default credentials (set your own in `.env.local`):

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me
```

**Change these before deploying.** Also set `ADMIN_SESSION_SECRET` to a long random string — this signs the admin session cookie.

## Project Structure

```
app/                    Next.js App Router pages & API routes
  (marketing pages)      /, /flights, /holiday-packages, /umrah-hajj, ...
  admin/                 Password-protected CMS dashboard
  api/                   Form submission + admin CRUD API routes
components/
  ui/                    Design-system primitives (Button, Badge, Accordion...)
  layout/                Header, Footer, mobile nav, floating actions...
  home/                  Homepage sections (Hero, Packages, Testimonials...)
  category/              Shared building blocks for holiday category pages
  forms/                 All 6 site forms (Contact, Quote, Visa, Corporate...)
  admin/                 Admin dashboard UI (sidebar, CRUD forms)
  legal/                 Legal page layout
lib/                     Data access, validation schemas, SEO helpers, utils
data/                    JSON "database" — destinations, packages, blog, etc.
types/                   Shared TypeScript types
public/                  Static assets (logo placeholders, airline logos)
```

## Brand & Design System

See **`BRAND_GUIDE.md`** for the full colour system, typography scale and component conventions. In short:

| Token | Value | Use |
|---|---|---|
| `navy-900` | `#071B33` | Primary text, dark surfaces |
| `royal-600` | `#0A4D8C` | Secondary brand blue, links |
| `gold-500` | `#C89A2B` | Accent, CTAs, highlights |
| `sky-500` | `#3AA8FF` | Interactive/focus accent only |
| `success-500` | `#00A86B` | Confirmations, WhatsApp |

Headings use **Manrope**, body text uses **Inter** (both loaded via `next/font/google`, self-hosted at build time — no external font requests at runtime).

### Logo

No logo was generated for this build, per the brief — a final logo will be supplied separately. Placeholder wordmark SVGs live at:

- `public/images/logo.svg` (default)
- `public/images/logo-white.svg` (dark backgrounds)
- `public/images/favicon.svg`

Swap these three files with the real artwork and every usage across the site (header, footer, admin, favicon, OG fallback) updates automatically via `components/layout/Logo.tsx`.

### Imagery

All photography currently uses [Picsum](https://picsum.photos) seeded placeholder URLs and [Pravatar](https://pravatar.cc) for avatars, so the site renders fully without any binary assets shipped in the repo. Replace the `image` fields in `data/*.json` with your licensed photography (or wire up a DAM/media library — see CMS migration below) before launch. The homepage hero also expects an optional cinematic video at `public/videos/hero.mp4` — until supplied, it gracefully falls back to a poster image.

## CMS & Admin Panel

The admin dashboard (`/admin`) provides full **create / edit / delete** web forms for:

- Holiday Packages & Offers
- Destinations
- Blog Posts
- Testimonials

No code changes or git commits are required to manage content — every save writes directly to the corresponding JSON file in `/data` via the API routes in `app/api/admin/*`.

### CMS migration path (Sanity / Payload)

This local JSON layer was a deliberate choice to ship a **fully working, zero-dependency CMS today**. When you're ready to move to a proper headless CMS:

1. Stand up a Sanity or Payload project and define schemas matching `types/index.ts` (`Destination`, `HolidayPackage`, `BlogPost`, `Testimonial`).
2. Replace the function bodies in `lib/data.ts` (`getPackages`, `getDestinations`, etc.) with calls to your CMS client (`@sanity/client` or Payload's REST/Local API) instead of `fs.readFile`.
3. Because every page and component calls these `lib/data.ts` functions — never the JSON files directly — **no other file in the codebase needs to change**.
4. Point the existing `/admin` dashboard UI at your CMS's API, or retire it in favour of Sanity Studio / the Payload admin UI, whichever you prefer.

Environment variables for this migration are already stubbed in `.env.example` (`SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`).

## SEO

- Per-page `generateMetadata`/`Metadata` exports with unique titles, descriptions, canonical URLs, Open Graph and Twitter Card data (`lib/seo.ts`)
- JSON-LD structured data: `TravelAgency` (site-wide), `FAQPage`, `BreadcrumbList`, `Article` (blog posts), `TouristTrip` (package pages)
- Auto-generated `sitemap.xml` (`app/sitemap.ts`) including every static page, package and blog post
- `robots.txt` (`app/robots.ts`) disallowing `/admin` and `/api`
- Semantic heading hierarchy, descriptive `alt` text on every image, and a human-readable `/sitemap` page for internal linking

## Forms

Six forms across the site (Contact, Quote Request, Holiday Enquiry, Newsletter, Visa Enquiry, Corporate Travel), all built with:

- **React Hook Form + Zod** client-side validation with inline errors
- **Honeypot field** spam protection (silently accepted, never delivered)
- **Server-side rate limiting** per IP (`lib/rate-limit.ts`)
- **Animated success state** on submit (`components/ui/SuccessState.tsx`)
- Server-side re-validation in every API route — never trust the client

Email delivery is provider-agnostic via `lib/mailer.ts`: set `RESEND_API_KEY` to send real emails through [Resend](https://resend.com), or leave it unset during development — submissions are logged to the server console instead so nothing is lost.

For production-grade bot protection beyond the honeypot, wire up Cloudflare Turnstile using the stubbed `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` env vars.

## Future Integrations

The architecture leaves clean seams for:

- **Flight/GDS search:** Duffel, Amadeus, Travelport, Skyscanner
- **Hotel content:** Hotelbeds, TBO Holidays
- **Payments:** Stripe, PayPal, Worldpay
- **Marketing/analytics:** GA4, GTM, Meta Pixel, Microsoft Clarity, Mailchimp
- **Reviews:** Google Reviews API
- **Messaging:** WhatsApp Business API, live chat (Intercom/Crisp/Tidio)

All relevant env vars are pre-stubbed in `.env.example`.

## Deployment

See **`DEPLOYMENT.md`** for step-by-step Vercel deployment instructions, environment variable setup and a pre-launch checklist.

## Accessibility

Built to WCAG AA: full keyboard navigation, visible focus states, a skip-to-content link, ARIA labelling on interactive components (accordion, mobile nav, cookie banner), and colour contrast checked against the brand palette.
