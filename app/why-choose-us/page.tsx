import type { Metadata } from "next";
import { ShieldCheck, Award, Lock, Globe2, Star } from "lucide-react";
import { CategoryHero } from "@/components/category/CategoryHero";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/home/CtaBanner";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why Choose Us — ATOL Protected, Trusted UK Travel Agency",
  description:
    "See why thousands of UK travellers trust Travel Mark Ltd: ATOL protection, secure payments, verified reviews and 15+ years of specialist experience.",
  path: "/why-choose-us",
});

const trustMarks = [
  { icon: ShieldCheck, title: "ATOL Protected", desc: `Financially protected under ${COMPANY.trust.atolNumber}.` },
  { icon: Globe2, title: "IATA Ready", desc: "Working toward full IATA accreditation for direct airline ticketing." },
  { icon: Lock, title: "SSL Secured", desc: "Every page and payment is encrypted end-to-end." },
  { icon: Star, title: `${COMPANY.trust.googleRating}/5 on Google`, desc: `From ${COMPANY.trust.googleReviewCount.toLocaleString()}+ verified reviews.` },
  { icon: Award, title: "Industry Recognised", desc: "Shortlisted, UK Travel Awards — Best Independent Agency." },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <CategoryHero
        eyebrow="Why Choose Us"
        title="Trust, Earned Trip After Trip"
        description="We built Travel Mark on the belief that booking travel should feel personal, transparent and completely secure."
        image="https://picsum.photos/seed/travelmark-why-hero/1920/1080"
        breadcrumbLabel="Why Choose Us"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading eyebrow="Trust Marks" title="The Protections Behind Every Booking" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {trustMarks.map((mark) => (
              <div
                key={mark.title}
                className="card-lift rounded-xl2 border border-navy-900/8 bg-surface p-6 text-center dark:border-white/10 dark:bg-white/5"
              >
                <mark.icon className="mx-auto h-8 w-8 text-gold-600" />
                <h3 className="mt-4 font-heading font-bold text-navy-900 dark:text-white">{mark.title}</h3>
                <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">{mark.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUsSection />
      <CtaBanner />
    </>
  );
}
