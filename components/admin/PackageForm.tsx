"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import type { HolidayPackage } from "@/types";
import { FieldWrapper, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

const categories: HolidayPackage["category"][] = [
  "holiday-packages",
  "umrah-hajj",
  "city-breaks",
  "beach-holidays",
  "luxury-holidays",
  "family-holidays",
  "special-offers",
];

type FormState = Omit<HolidayPackage, "highlights"> & { highlights: string };

function toFormState(pkg?: Partial<HolidayPackage>): FormState {
  return {
    id: pkg?.id ?? "",
    slug: pkg?.slug ?? "",
    title: pkg?.title ?? "",
    destination: pkg?.destination ?? "",
    category: pkg?.category ?? "holiday-packages",
    image: pkg?.image ?? "",
    price: pkg?.price ?? 0,
    originalPrice: pkg?.originalPrice,
    duration: pkg?.duration ?? "",
    airline: pkg?.airline ?? "",
    hotelRating: pkg?.hotelRating ?? 4,
    hotelName: pkg?.hotelName ?? "",
    transfersIncluded: pkg?.transfersIncluded ?? true,
    boardBasis: pkg?.boardBasis ?? "Bed & Breakfast",
    highlights: (pkg?.highlights ?? []).join("\n"),
    description: pkg?.description ?? "",
    featured: pkg?.featured ?? false,
    offerEndsAt: pkg?.offerEndsAt,
  };
}

export function PackageForm({ initial }: { initial?: HolidayPackage }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(toFormState(initial));
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      highlights: form.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
    };
    try {
      const endpoint = isEdit ? `/api/admin/packages/${initial!.id}` : "/api/admin/packages";
      await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      router.push("/admin/packages");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Title" htmlFor="title" required>
          <Input id="title" required value={form.title} onChange={(e) => update("title", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Destination" htmlFor="destination" required>
          <Input
            id="destination"
            required
            value={form.destination}
            onChange={(e) => update("destination", e.target.value)}
          />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FieldWrapper label="Category" htmlFor="category" required>
          <Select
            id="category"
            value={form.category}
            onChange={(e) => update("category", e.target.value as HolidayPackage["category"])}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </FieldWrapper>
        <FieldWrapper label="Price (£)" htmlFor="price" required>
          <Input
            id="price"
            type="number"
            required
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
          />
        </FieldWrapper>
        <FieldWrapper label="Original Price (£, optional)" htmlFor="originalPrice">
          <Input
            id="originalPrice"
            type="number"
            value={form.originalPrice ?? ""}
            onChange={(e) => update("originalPrice", e.target.value ? Number(e.target.value) : undefined)}
          />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FieldWrapper label="Duration" htmlFor="duration" required>
          <Input
            id="duration"
            placeholder="e.g. 7 nights"
            required
            value={form.duration}
            onChange={(e) => update("duration", e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper label="Airline" htmlFor="airline" required>
          <Input id="airline" required value={form.airline} onChange={(e) => update("airline", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Hotel Star Rating" htmlFor="hotelRating">
          <Select
            id="hotelRating"
            value={form.hotelRating}
            onChange={(e) => update("hotelRating", Number(e.target.value))}
          >
            {[3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Star
              </option>
            ))}
          </Select>
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Hotel Name" htmlFor="hotelName" required>
          <Input id="hotelName" required value={form.hotelName} onChange={(e) => update("hotelName", e.target.value)} />
        </FieldWrapper>
        <FieldWrapper label="Board Basis" htmlFor="boardBasis">
          <Select id="boardBasis" value={form.boardBasis} onChange={(e) => update("boardBasis", e.target.value)}>
            {["Room Only", "Bed & Breakfast", "Half Board", "Full Board", "All Inclusive"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </FieldWrapper>
      </div>

      <FieldWrapper label="Image URL" htmlFor="image">
        <Input
          id="image"
          placeholder="https://..."
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper label="Highlights (one per line)" htmlFor="highlights">
        <Textarea
          id="highlights"
          rows={4}
          value={form.highlights}
          onChange={(e) => update("highlights", e.target.value)}
        />
      </FieldWrapper>

      <FieldWrapper label="Description" htmlFor="description" required>
        <Textarea
          id="description"
          required
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </FieldWrapper>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FieldWrapper label="Offer Ends At (optional)" htmlFor="offerEndsAt">
          <Input
            id="offerEndsAt"
            type="date"
            value={form.offerEndsAt ?? ""}
            onChange={(e) => update("offerEndsAt", e.target.value || undefined)}
          />
        </FieldWrapper>
        <label className="flex items-center gap-2 self-end pb-3 text-sm font-medium text-navy-900 dark:text-white">
          <input
            type="checkbox"
            checked={form.transfersIncluded}
            onChange={(e) => update("transfersIncluded", e.target.checked)}
            className="h-4 w-4 rounded border-navy-900/20 text-royal-600"
          />
          Transfers Included
        </label>
        <label className="flex items-center gap-2 self-end pb-3 text-sm font-medium text-navy-900 dark:text-white">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 rounded border-navy-900/20 text-royal-600"
          />
          Featured on Homepage
        </label>
      </div>

      <Button type="submit" disabled={saving} size="lg" variant="gold">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {isEdit ? "Save Changes" : "Create Package"}
      </Button>
    </form>
  );
}
