# Travel Mark Ltd — Brand Style Guide

A luxury, aviation-inspired identity positioned alongside Emirates, Qatar Airways and British Airways in tone — minimal, trustworthy, international.

## Brand Personality

Luxury · Trustworthy · Professional · Modern · Elegant · Minimal · International · Friendly · High-end

## Colour System

### Primary Palette

| Name | Hex | Tailwind Token | Usage |
|---|---|---|---|
| Deep Navy | `#071B33` | `navy-900` | Primary text, headers, dark sections |
| Royal Blue | `#0A4D8C` | `royal-600` | Links, secondary buttons, info states |
| Gold | `#C89A2B` | `gold-500` | CTAs, accents, premium highlights |
| White | `#FFFFFF` | `white` | Backgrounds, text on dark |
| Light Background | `#F7F8FA` | `surface` | Section backgrounds |
| Dark Text | `#1B1F23` | `ink` | Body copy on light backgrounds |

### Accent & Feedback

| Name | Hex | Tailwind Token | Usage |
|---|---|---|---|
| Sky Blue | `#3AA8FF` | `sky-500` | Focus rings, interactive accents only |
| Success Green | `#00A86B` | `success-500` | Confirmations, WhatsApp, success states |

Each colour has a full 50–900 scale generated in `tailwind.config.ts` for tints/shades (hover states, subtle backgrounds, borders).

**Rules:**
- No bright gradients — the only gradients used are subtle navy-to-transparent scrims over photography.
- Gold is reserved for calls-to-action and premium signals; overusing it dilutes the effect.
- Sky blue is interactive-only — never used decoratively.

## Typography

| Role | Typeface | Tailwind Token |
|---|---|---|
| Headings | **Manrope** (600–800 weight) | `font-heading` |
| Body | **Inter** (400–600 weight) | `font-body` |
| Buttons | Manrope, Semi-Bold | `font-heading font-semibold` |

Display scale (`tailwind.config.ts`): `text-display-sm` → `text-display-xl`, all with tightened letter-spacing and tuned line-height for a premium editorial feel. Body copy defaults to generous line-height (`leading-relaxed`) for readability.

## Spacing, Radius & Shadow

- **Section rhythm:** `.section` utility = `py-20 md:py-28` — consistent vertical breathing room site-wide.
- **Radius:** rounded corners throughout — `rounded-xl2` (1.25rem) for cards, `rounded-xl3` (1.75rem) for hero panels/modals, `rounded-full` for buttons and pills. No sharp corners anywhere in the UI.
- **Shadows:** two custom soft shadows — `shadow-soft` (resting state) and `shadow-elevated` (hover/lift state) — both built from low-opacity navy, never black, for a warmer, premium feel. `shadow-gold` is reserved for gold CTA buttons.
- **Glassmorphism:** used sparingly — the sticky header (`.glass-surface`) and cookie banner only. Not used decoratively elsewhere.

## Motion

- **Entrance animations:** fade + slide-up on scroll (`framer-motion`'s `whileInView`), staggered slightly across grids.
- **Hover:** card lift (`.card-lift` — translateY + shadow) and 1.1x image zoom on cards.
- **Micro-interactions:** button ripple-on-click, animated counters, floating decorative elements in the hero, animated FAQ accordions.
- **Timing:** all custom transitions use the `ease-premium` cubic-bezier (`0.16, 1, 0.3, 1`) — a signature "premium decelerate" curve, not a default ease.

## Components

The full component library lives in `components/ui/`. Every component is:
- Built from first principles (no off-the-shelf UI kit copy-pasted in)
- Fully typed (TypeScript strict mode)
- Dark-mode aware (`dark:` variants throughout)
- Accessible by default (ARIA attributes, keyboard support, visible focus rings)

## Logo Usage

No logo was generated for this project — the brief specifies a final logo will be supplied separately. Until then, placeholder wordmarks live at `public/images/logo.svg`, `logo-white.svg` and `favicon.svg`, wired through `components/layout/Logo.tsx`. Replace these three files with the final artwork (SVG preferred) and the logo updates everywhere: header, footer, admin dashboard, favicon and the OG-image fallback.

**When the real logo arrives:**
- Maintain clear space equal to the logo's cap-height on all sides
- Use the white variant exclusively on navy/dark photography backgrounds
- Do not recolour, stretch, rotate or add effects to the logo
