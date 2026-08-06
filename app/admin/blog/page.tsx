import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Blog Posts</h1>
          <p className="mt-1 text-navy-600 dark:text-white/60">{posts.length} articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" /> Add Post
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl2 bg-white shadow-soft dark:bg-navy-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-navy-900/8 bg-surface text-xs uppercase tracking-wider text-navy-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-900/8 dark:divide-white/10">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-5 py-4 font-semibold text-navy-900 dark:text-white">{post.title}</td>
                <td className="px-5 py-4 text-navy-600 dark:text-white/60">{post.category}</td>
                <td className="px-5 py-4 text-navy-600 dark:text-white/60">{formatDate(post.date)}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-royal-600 hover:bg-royal-50 dark:hover:bg-royal-500/10"
                      aria-label={`Edit ${post.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton endpoint={`/api/admin/blog/${post.id}`} itemLabel={post.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
