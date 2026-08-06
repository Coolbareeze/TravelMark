import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Add Testimonial</h1>
      <div className="mt-8 rounded-xl2 bg-white p-6 shadow-soft dark:bg-navy-800 md:p-8">
        <TestimonialForm />
      </div>
    </div>
  );
}
