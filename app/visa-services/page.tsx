import type { Metadata } from "next";
import Image from "next/image";
import { CategoryHero } from "@/components/category/CategoryHero";
import { FeatureList } from "@/components/category/FeatureList";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisaEnquiryForm } from "@/components/forms/VisaEnquiryForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Visa Services — Applications Handled for You",
  description:
    "End-to-end visa application support for tourist, business and Umrah visas, handled by our experienced UK-based documentation team.",
  path: "/visa-services",
});

export default function VisaServicesPage() {
  return (
    <>
      <CategoryHero
        eyebrow="Visa Services"
        title="Visa Applications, Handled Properly"
        description="Confusing forms, shifting requirements, tight deadlines — we take the stress of visa applications off your plate entirely."
        image="https://picsum.photos/seed/travelmark-visa-hero/1920/1080"
        breadcrumbLabel="Visa Services"
        ctaLabel="Start Your Visa Enquiry"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96 lg:order-1">
            <Image
              src="https://picsum.photos/seed/travelmark-visa-side/900/1100"
              alt="Passport and travel documents on a desk"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading align="left" eyebrow="What We Handle" title="Every Visa Type, One Team" className="mx-0" />
            <div className="mt-8">
              <FeatureList
                items={[
                  "Tourist and business visa applications",
                  "Umrah and Hajj visa processing",
                  "Document checklists tailored to your nationality",
                  "Application tracking and status updates",
                  "Urgent / expedited processing where available",
                  "Guidance on ETA, ESTA and e-Visa schemes",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container max-w-2xl">
          <SectionHeading eyebrow="Get Started" title="Submit a Visa Enquiry" />
          <div className="mt-10 rounded-xl3 bg-white p-8 shadow-soft dark:bg-navy-800 md:p-10">
            <VisaEnquiryForm />
          </div>
        </div>
      </section>

      <CategoryFaq
        items={[
          {
            question: "How long does a visa application take?",
            answer: "Processing times vary by country and visa type — typically 3-15 working days. We'll confirm an estimated timeline once we understand your destination and nationality.",
          },
          {
            question: "Do you handle visas for non-UK nationals living in the UK?",
            answer: "Yes, we process visa applications for UK residents of any nationality, factoring in the specific requirements that apply to your passport.",
          },
          {
            question: "What documents will I need to provide?",
            answer: "This depends on the destination, but typically includes your passport, passport photos, proof of accommodation and travel itinerary. We'll send a tailored checklist after your enquiry.",
          },
        ]}
      />
    </>
  );
}
