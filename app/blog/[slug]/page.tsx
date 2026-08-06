import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n").filter(Boolean);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
        }}
      />

      <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-navy-950">
        <Image src={post.image} alt="" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-hero-scrim" />
        <div className="container relative z-10 pb-12 pt-32">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/85">{post.title}</span>
          </nav>
          <Badge tone="gold">{post.category}</Badge>
          <h1 className="mt-4 max-w-3xl text-display-sm text-balance text-white md:text-display-md">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-white/60">
            {formatDate(post.date)} · {post.readTime} · By {post.author}
          </p>
        </div>
      </section>

      <article className="section bg-white dark:bg-navy-950">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-900 prose-a:text-royal-600 dark:prose-invert">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      <NewsletterSection />
    </>
  );
}
