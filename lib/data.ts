import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { Destination, HolidayPackage, Airline, Testimonial, BlogPost } from "@/types";

// ─────────────────────────────────────────────────────────────────────────
// Local JSON-file data layer.
//
// This stands in for a headless CMS today so the admin panel (see /admin)
// can read and write real content with zero external dependencies. Every
// function here is intentionally narrow so that swapping the JSON reads
// below for a Sanity or Payload client later only touches this one file —
// no component or page needs to change. See README.md "CMS migration path".
// ─────────────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data");

async function readJson<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + "\n", "utf-8");
}

// ── Destinations ────────────────────────────────────────────────────────
export const getDestinations = () => readJson<Destination[]>("destinations.json");
export const getFeaturedDestinations = async () =>
  (await getDestinations()).filter((d) => d.featured);
export const getDestinationBySlug = async (slug: string) =>
  (await getDestinations()).find((d) => d.slug === slug);
export const saveDestinations = (data: Destination[]) => writeJson("destinations.json", data);

// ── Packages ─────────────────────────────────────────────────────────────
export const getPackages = () => readJson<HolidayPackage[]>("packages.json");
export const getFeaturedPackages = async () => (await getPackages()).filter((p) => p.featured);
export const getPackagesByCategory = async (category: HolidayPackage["category"]) =>
  (await getPackages()).filter((p) => p.category === category);
export const getPackageBySlug = async (slug: string) =>
  (await getPackages()).find((p) => p.slug === slug);
export const getCurrentOffers = async () =>
  (await getPackages()).filter((p) => !!p.offerEndsAt || !!p.originalPrice);
export const savePackages = (data: HolidayPackage[]) => writeJson("packages.json", data);

// ── Airlines ─────────────────────────────────────────────────────────────
export const getAirlines = () => readJson<Airline[]>("airlines.json");
export const saveAirlines = (data: Airline[]) => writeJson("airlines.json", data);

// ── Testimonials ─────────────────────────────────────────────────────────
export const getTestimonials = () => readJson<Testimonial[]>("testimonials.json");
export const saveTestimonials = (data: Testimonial[]) => writeJson("testimonials.json", data);

// ── Blog ─────────────────────────────────────────────────────────────────
export const getBlogPosts = async () => {
  const posts = await readJson<BlogPost[]>("blog.json");
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};
export const getFeaturedBlogPosts = async () => (await getBlogPosts()).filter((p) => p.featured);
export const getBlogPostBySlug = async (slug: string) =>
  (await getBlogPosts()).find((p) => p.slug === slug);
export const getBlogCategories = async () => {
  const posts = await getBlogPosts();
  return Array.from(new Set(posts.map((p) => p.category)));
};
export const saveBlogPosts = (data: BlogPost[]) => writeJson("blog.json", data);
