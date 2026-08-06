"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import type { BlogPost } from "@/types";
import { FieldWrapper, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function BlogForm({ initial }: { initial?: BlogPost }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<BlogPost>>(initial ?? { featured: false });
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial);

  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const endpoint = isEdit ? `/api/admin/blog/${initial!.id}` : "/api/admin/blog";
      await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/admin/blog");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldWrapper label="Title" htmlFor="title" required>
        <Input id="title" required value={form.title ?? ""} onChange={(e) => update("title", e.target.value)} />
      </FieldWrapper>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FieldWrapper label="Category" htmlFor="category" required>
          <Input id="category" required value={form.category ?? ""} onChange={(e) => update("category", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Author" htmlFor="author" required>
          <Input id="author" required value={form.author ?? ""} onChange={(e) => update("author", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Read Time" htmlFor="readTime">
          <Input
            id="readTime"
            placeholder="5 min read"
            value={form.readTime ?? ""}
            onChange={(e) => update("readTime", e.target.value)}
          />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Image URL" htmlFor="image">
        <Input id="image" value={form.image ?? ""} onChange={(e) => update("image", e.target.value)} />
      </FieldWrapper>
      <FieldWrapper label="Excerpt" htmlFor="excerpt" required>
        <Textarea id="excerpt" required rows={2} value={form.excerpt ?? ""} onChange={(e) => update("excerpt", e.target.value)} />
      </FieldWrapper>
      <FieldWrapper label="Content" htmlFor="content" required>
        <Textarea id="content" required rows={8} value={form.content ?? ""} onChange={(e) => update("content", e.target.value)} />
      </FieldWrapper>
      <label className="flex items-center gap-2 text-sm font-medium text-navy-900 dark:text-white">
        <input
          type="checkbox"
          checked={form.featured ?? false}
          onChange={(e) => update("featured", e.target.checked)}
          className="h-4 w-4 rounded border-navy-900/20 text-royal-600"
        />
        Featured on Homepage
      </label>
      <Button type="submit" disabled={saving} size="lg" variant="gold">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {isEdit ? "Save Changes" : "Publish Post"}
      </Button>
    </form>
  );
}
