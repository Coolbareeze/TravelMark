"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import type { Destination } from "@/types";
import { FieldWrapper, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

const regions: Destination["region"][] = ["UK", "Africa", "Middle East", "Asia", "Europe", "Americas", "Oceania"];

export function DestinationForm({ initial }: { initial?: Destination }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Destination>>(
    initial ?? { region: "Europe", fromPrice: 0, featured: false }
  );
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial);

  function update<K extends keyof Destination>(key: K, value: Destination[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const endpoint = isEdit ? `/api/admin/destinations/${initial!.id}` : "/api/admin/destinations";
      await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/admin/destinations");
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
        <FieldWrapper label="Country" htmlFor="country" required>
          <Input id="country" required value={form.country ?? ""} onChange={(e) => update("country", e.target.value)} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Region" htmlFor="region">
          <Select id="region" value={form.region} onChange={(e) => update("region", e.target.value as Destination["region"])}>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </FieldWrapper>
        <FieldWrapper label="From Price (£)" htmlFor="fromPrice" required>
          <Input
            id="fromPrice"
            type="number"
            required
            value={form.fromPrice ?? 0}
            onChange={(e) => update("fromPrice", Number(e.target.value))}
          />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Image URL" htmlFor="image">
        <Input id="image" value={form.image ?? ""} onChange={(e) => update("image", e.target.value)} />
      </FieldWrapper>
      <FieldWrapper label="Blurb" htmlFor="blurb" required>
        <Textarea id="blurb" required rows={3} value={form.blurb ?? ""} onChange={(e) => update("blurb", e.target.value)} />
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
        {isEdit ? "Save Changes" : "Create Destination"}
      </Button>
    </form>
  );
}
