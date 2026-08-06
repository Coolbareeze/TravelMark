import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getFeaturedBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function BlogTeaserSection() {
  const posts = (await getFeaturedBlogPosts()).slice(0, 3);

  return (
    <section className="section bg-white dark:bg-navy-950">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Travel Inspiration"
            title="From the Travel Mark Journal"
            description="Guides, tips and destination inspiration from our consultants."
            className="mx-0"
          />
          <Button href="/blog" variant="outline">
            Visit the Blog
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
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
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 dark:text-sky-400">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
