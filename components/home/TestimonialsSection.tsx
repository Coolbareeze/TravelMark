import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { getTestimonials } from "@/lib/data";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="section bg-surface dark:bg-navy-900">
      <div className="container">
        <SectionHeading
          eyebrow="Real Stories"
          title="What Our Travellers Say"
          description="Real reviews from real trips — booked, protected and delivered by Travel Mark."
        />

        <div className="mt-14">
          <Carousel slideClassName="w-full sm:w-1/2 lg:w-1/3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex h-full flex-col rounded-xl3 bg-white p-7 shadow-soft dark:bg-navy-800"
              >
                <Quote className="h-8 w-8 text-gold-500/40" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-navy-800 dark:text-white/80">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-navy-900/8 pt-4 dark:border-white/10">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-navy-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-navy-500 dark:text-white/50">{t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
