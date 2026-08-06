# Deployment Guide

Recommended host: **Vercel** (built by the Next.js team; zero-config for App Router, SSR, image optimisation and cron-free ISR).

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Travel Mark Ltd website"
git branch -M main
git remote add origin https://github.com/<your-org>/travelmark.git
git push -u origin main
```

## 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected).
3. Build command: `next build` (default). Output: `.next` (default).
4. Add environment variables (see below) under **Settings → Environment Variables** before the first deploy.

## 3. Environment Variables

Copy every key from `.env.example` into Vercel's dashboard. At minimum for a working launch:

| Variable | Required for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Correct canonical URLs, sitemap, OG tags |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Admin dashboard login |
| `ADMIN_SESSION_SECRET` | Signs the admin session cookie — use a long random string |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | Form submissions actually emailing you (optional but recommended) |

Everything else (payment, GDS, analytics keys) can be added later as those integrations are wired up — the site runs fully without them.

## 4. Custom Domain

In Vercel: **Settings → Domains** → add `travelmark.co.uk` and `www.travelmark.co.uk`. Update your DNS (A/CNAME records) as instructed by Vercel. SSL is issued automatically.

## 5. Important: Persistent Data on Vercel

The local JSON "CMS" (`/data/*.json`) is written to via the admin dashboard using Node's filesystem API. **This works locally and on traditional servers, but Vercel's serverless functions have a read-only, ephemeral filesystem in production** — writes from the admin dashboard will not persist between deployments/invocations on Vercel.

You have two options before launch:

1. **Recommended:** Complete the CMS migration described in `README.md → "CMS migration path"` and move to Sanity or Payload (both work perfectly on Vercel, with persistent, versioned content storage and a proper media library).
2. **Alternative (quick fix):** Point `lib/data.ts`'s read/write functions at a small database instead of the filesystem — Vercel Postgres, Vercel KV, or a Supabase table map cleanly onto the same `Destination[]` / `HolidayPackage[]` shapes already defined in `types/index.ts`.

If you deploy to a traditional VPS or container host (not serverless) instead of Vercel, the filesystem-backed admin panel works as-is with no changes.

## 6. Pre-Launch Checklist

- [ ] Replace placeholder logo files with final artwork (`public/images/logo*.svg`, `favicon.svg`)
- [ ] Replace `data/*.json` placeholder imagery with licensed photography
- [ ] Add `public/videos/hero.mp4` for the homepage hero (optional — falls back gracefully)
- [ ] Set real `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`
- [ ] Decide on the CMS persistence approach for Vercel (see §5 above)
- [ ] Connect a real ATOL number and company registration details in `lib/constants.ts`
- [ ] Wire up `RESEND_API_KEY` (or your preferred email provider) so form submissions arrive by email
- [ ] Add `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID` once analytics accounts exist
- [ ] Run Lighthouse against the production deployment and confirm 95+ across Performance/SEO/Accessibility
- [ ] Submit `/sitemap.xml` to Google Search Console and Bing Webmaster Tools
