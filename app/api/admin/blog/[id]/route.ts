import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, saveBlogPosts } from "@/lib/data";
import type { BlogPost } from "@/types";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = (await req.json()) as Partial<BlogPost>;
  const posts = await getBlogPosts();
  const index = posts.findIndex((p) => p.id === params.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  posts[index] = { ...posts[index], ...body, featured: Boolean(body.featured) } as BlogPost;
  await saveBlogPosts(posts);
  return NextResponse.json(posts[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const posts = await getBlogPosts();
  const filtered = posts.filter((p) => p.id !== params.id);
  if (filtered.length === posts.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveBlogPosts(filtered);
  return NextResponse.json({ ok: true });
}
