import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts, getPackages } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sitemap",
  description: "A full overview of every page on the Travel Mark Ltd website.",
  path: "/sitemap",
});

const sections = [
  {
    heading: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Flights", href: "/flights" },
      { label: "About Us", href: "/about" },
      { label: "Why Choose Us", href: "/why-choose-us" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Holidays",
    links: [
      { label: "Holiday Packages", href: "/holiday-packages" },
      { label: "Umrah & Hajj Packages", href: "/umrah-hajj" },
      { label: "City Breaks", href: "/city-breaks" },
      { label: "Beach Holidays", href: "/beach-holidays" },
      { label: "Luxury Holidays", href: "/luxury-holidays" },
      { label: "Family Holidays", href: "/family-holidays" },
      { label: "Special Offers", href: "/special-offers" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Business Travel", href: "/business-travel" },
      { label: "Visa Services", href: "/visa-services" },
      { label: "Travel Insurance", href: "/travel-insurance" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export default async function SitemapPage() {
  const [packages, posts] = await Promise.all([getPackages(), getBlogPosts()]);

  return (
    <section className="section bg-white pt-32 dark:bg-navy-950">
      <div className="container max-w-4xl">
        <h1 className="text-display-sm text-navy-900 dark:text-white">Sitemap</h1>
        <p className="mt-3 text-navy-600 dark:text-white/60">
          A complete, human-readable overview of every page on travelmark.co.uk.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-heading text-lg font-bold text-navy-900 dark:text-white">
                {section.heading}
              </h2>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-royal-600 hover:underline dark:text-sky-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-heading text-lg font-bold text-navy-900 dark:text-white">
              Holiday Packages ({packages.length})
            </h2>
            <ul className="mt-4 space-y-2">
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    href={`/holiday-packages/${pkg.slug}`}
                    className="text-royal-600 hover:underline dark:text-sky-400"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-lg font-bold text-navy-900 dark:text-white">
              Blog ({posts.length})
            </h2>
            <ul className="mt-4 space-y-2">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="text-royal-600 hover:underline dark:text-sky-400">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-sm text-navy-500 dark:text-white/50">
          Looking for the XML version for search engines? See{" "}
          <a href="/sitemap.xml" className="text-royal-600 dark:text-sky-400">
            /sitemap.xml
          </a>
          .
        </p>
      </div>
    </section>
  );
}
