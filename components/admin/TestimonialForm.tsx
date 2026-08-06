"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import type { Testimonial } from "@/types";
import { FieldWrapper, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function TestimonialForm({ initial }: { initial?: Testimonial }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Testimonial>>(initial ?? { rating: 5 });
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial);

  function update<K extends keyof Testimonial>(key: K, value: Testimonial[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const endpoint = isEdit ? `/api/admin/testimonials/${initial!.id}` : "/api/admin/testimonials";
      await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/admin/testimonials");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Name" htmlFor="name" required>
          <Input id="name" required value={form.name ?? ""} onChange={(e) => update("name", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Location" htmlFor="location" required>
          <Input id="location" required value={form.location ?? ""} onChange={(e) => update("location", e.target.value)} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Trip" htmlFor="trip" required>
          <Input id="trip" required value={form.trip ?? ""} onChange={(e) => update("trip", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Rating" htmlFor="rating">
          <Select id="rating" value={form.rating ?? 5} onChange={(e) => update("rating", Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Stars
              </option>
            ))}
          </Select>
        </FieldWrapper>
      </div>
      <FieldWrapper label="Avatar URL" htmlFor="avatar">
        <Input id="avatar" value={form.avatar ?? ""} onChange={(e) => update("avatar", e.target.value)} />
      </FieldWrapper>
      <FieldWrapper label="Quote" htmlFor="quote" required>
        <Textarea id="quote" required rows={4} value={form.quote ?? ""} onChange={(e) => update("quote", e.target.value)} />
      </FieldWrapper>
      <Button type="submit" disabled={saving} size="lg" variant="gold">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {isEdit ? "Save Changes" : "Add Testimonial"}
      </Button>
    </form>
  );
}
