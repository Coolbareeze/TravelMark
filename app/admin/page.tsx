import Link from "next/link";
import { Package, MapPin, Newspaper, MessageSquareQuote, ArrowUpRight } from "lucide-react";
import { getBlogPosts, getDestinations, getPackages, getTestimonials } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [packages, destinations, posts, testimonials] = await Promise.all([
    getPackages(),
    getDestinations(),
    getBlogPosts(),
    getTestimonials(),
  ]);

  const cards = [
    { label: "Packages & Offers", count: packages.length, href: "/admin/packages", icon: Package },
    { label: "Destinations", count: destinations.length, href: "/admin/destinations", icon: MapPin },
    { label: "Blog Posts", count: posts.length, href: "/admin/blog", icon: Newspaper },
    { label: "Testimonials", count: testimonials.length, href: "/admin/testimonials", icon: MessageSquareQuote },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Dashboard</h1>
      <p className="mt-1 text-navy-600 dark:text-white/60">
        Manage your website content — no code or deployment required.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="card-lift group rounded-xl2 bg-white p-6 shadow-soft dark:bg-navy-800"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                <card.icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-navy-300 transition group-hover:text-royal-600 dark:text-white/30" />
            </div>
            <p className="mt-4 font-heading text-3xl font-bold text-navy-900 dark:text-white">{card.count}</p>
            <p className="text-sm text-navy-600 dark:text-white/60">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl2 border border-dashed border-navy-900/15 bg-white p-6 text-sm text-navy-600 dark:border-white/15 dark:bg-navy-800 dark:text-white/60">
        <p className="font-semibold text-navy-900 dark:text-white">About this dashboard</p>
        <p className="mt-2">
          Content saved here writes directly to the JSON files in <code>/data</code>. This gives
          you a fully working CMS with zero external dependencies today. When you're ready for
          multi-editor workflows, media libraries or scheduled publishing, see{" "}
          <code>README.md → "CMS migration path"</code> for a drop-in path to Sanity or Payload
          that keeps this exact dashboard UI.
        </p>
      </div>
    </div>
  );
}
