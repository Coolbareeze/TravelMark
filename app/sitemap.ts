import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getBlogPosts, getPackages } from "@/lib/data";

const staticRoutes = [
  "",
  "/flights",
  "/holiday-packages",
  "/umrah-hajj",
  "/city-breaks",
  "/beach-holidays",
  "/luxury-holidays",
  "/family-holidays",
  "/business-travel",
  "/visa-services",
  "/travel-insurance",
  "/about",
  "/why-choose-us",
  "/special-offers",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, posts] = await Promise.all([getPackages(), getBlogPosts()]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const packageEntries: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${SITE_URL}/holiday-packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...packageEntries, ...blogEntries];
}
