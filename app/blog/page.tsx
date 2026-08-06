import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { CategoryHero } from "@/components/category/CategoryHero";
import { Badge } from "@/components/ui/Badge";
import { getBlogCategories, getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Travel Blog — Guides, Tips & Destination Inspiration",
  description:
    "The Travel Mark journal: destination guides, visa updates, Umrah preparation tips and expert travel advice from our UK consultants.",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const [allPosts, categories] = await Promise.all([getBlogPosts(), getBlogCategories()]);

  const filtered = allPosts.filter((post) => {
    const matchesCategory = !searchParams.category || post.category === searchParams.category;
    const matchesQuery =
      !searchParams.q || post.title.toLowerCase().includes(searchParams.q.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const [featured, ...rest] = filtered;

  return (
    <>
      <CategoryHero
        eyebrow="Travel Mark Journal"
        title="Guides, Tips & Inspiration"
        description="Practical, expert-written travel guidance — from visa updates to destination deep-dives."
        image="https://picsum.photos/seed/travelmark-blog-hero/1920/1080"
        breadcrumbLabel="Blog"
        ctaLabel="Get a Free Quote"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <form className="relative w-full max-w-sm" action="/blog" method="GET">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                type="search"
                name="q"
                defaultValue={searchParams.q}
                placeholder="Search articles..."
                className="h-12 w-full rounded-full border border-navy-900/12 bg-white pl-11 pr-4 text-sm focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 dark:border-white/15 dark:bg-navy-800 dark:text-white"
              />
            </form>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="rounded-full border border-navy-900/10 px-4 py-2 text-xs font-semibold text-navy-700 hover:bg-navy-900/5 dark:border-white/15 dark:text-white/70"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className="rounded-full border border-navy-900/10 px-4 py-2 text-xs font-semibold text-navy-700 hover:bg-navy-900/5 dark:border-white/15 dark:text-white/70"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="card-lift mt-12 grid grid-cols-1 overflow-hidden rounded-xl3 bg-surface shadow-soft dark:bg-white/5 lg:grid-cols-2"
            >
              <div className="relative h-64 lg:h-full">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <Badge tone="gold" className="w-fit">
                  {featured.category}
                </Badge>
                <h2 className="mt-4 font-heading text-2xl font-bold leading-snug text-navy-900 dark:text-white md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-navy-700/70 dark:text-white/60">{featured.excerpt}</p>
                <p className="mt-4 text-xs text-navy-500 dark:text-white/50">
                  {formatDate(featured.date)} · {featured.readTime} · By {featured.author}
                </p>
              </div>
            </Link>
          )}

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-lift group flex flex-col overflow-hidden rounded-xl3 bg-surface shadow-soft dark:bg-white/5"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
                  />
                  <Badge tone="gold" className="absolute left-3 top-3">
                    {post.category}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-navy-500 dark:text-white/50">
                    {formatDate(post.date)} · {post.readTime}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-navy-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-navy-700/70 dark:text-white/60">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-navy-600 dark:text-white/60">
              No articles matched your search — try a different term or browse all articles.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
