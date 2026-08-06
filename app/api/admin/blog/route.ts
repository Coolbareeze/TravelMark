import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, saveBlogPosts } from "@/lib/data";
import { slugify } from "@/lib/utils";
import type { BlogPost } from "@/types";

export async function GET() {
  return NextResponse.json(await getBlogPosts());
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<BlogPost>;
  const posts = await getBlogPosts();

  const newPost: BlogPost = {
    id: `b${Date.now()}`,
    slug: body.slug?.trim() || slugify(body.title ?? "new-post"),
    title: body.title ?? "Untitled Post",
    excerpt: body.excerpt ?? "",
    content: body.content ?? "",
    category: body.category ?? "Travel Tips",
    image: body.image || "https://picsum.photos/seed/travelmark-newpost/1200/800",
    author: body.author ?? "Travel Mark Team",
    date: body.date || new Date().toISOString().slice(0, 10),
    readTime: body.readTime || "5 min read",
    featured: Boolean(body.featured),
  };

  posts.unshift(newPost);
  await saveBlogPosts(posts);
  return NextResponse.json(newPost, { status: 201 });
}
