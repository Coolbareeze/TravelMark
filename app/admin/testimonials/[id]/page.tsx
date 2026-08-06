import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { getTestimonials } from "@/lib/data";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonials = await getTestimonials();
  const testimonial = testimonials.find((t) => t.id === params.id);
  if (!testimonial) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Edit Testimonial</h1>
      <div className="mt-8 rounded-xl2 bg-white p-6 shadow-soft dark:bg-navy-800 md:p-8">
        <TestimonialForm initial={testimonial} />
      </div>
    </div>
  );
}
