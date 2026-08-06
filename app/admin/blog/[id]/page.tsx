import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { getBlogPosts } from "@/lib/data";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.id === params.id);
  if (!post) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Edit Blog Post</h1>
      <div className="mt-8 rounded-xl2 bg-white p-6 shadow-soft dark:bg-navy-800 md:p-8">
        <BlogForm initial={post} />
      </div>
    </div>
  );
}
