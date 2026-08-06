import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getTestimonials } from "@/lib/data";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Testimonials</h1>
          <p className="mt-1 text-navy-600 dark:text-white/60">{testimonials.length} reviews</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" /> Add Testimonial
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl2 bg-white p-5 shadow-soft dark:bg-navy-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-navy-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-navy-500 dark:text-white/50">{t.location}</p>
              </div>
              <div className="flex gap-1">
                <Link
                  href={`/admin/testimonials/${t.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-royal-600 hover:bg-royal-50 dark:hover:bg-royal-500/10"
                  aria-label={`Edit ${t.name}`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <DeleteButton endpoint={`/api/admin/testimonials/${t.id}`} itemLabel={t.name} />
              </div>
            </div>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
              ))}
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-navy-700/70 dark:text-white/60">{t.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
