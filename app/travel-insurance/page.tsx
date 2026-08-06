import type { Metadata } from "next";
import Image from "next/image";
import { CategoryHero } from "@/components/category/CategoryHero";
import { FeatureList } from "@/components/category/FeatureList";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Travel Insurance — Comprehensive Cover for Every Trip",
  description:
    "Single-trip, annual multi-trip and family travel insurance policies arranged alongside your booking for complete peace of mind.",
  path: "/travel-insurance",
});

export default function TravelInsurancePage() {
  return (
    <>
      <CategoryHero
        eyebrow="Travel Insurance"
        title="Cover That Actually Covers You"
        description="Medical emergencies, cancellations, lost luggage — comprehensive travel insurance arranged alongside your booking, in one call."
        image="https://picsum.photos/seed/travelmark-insurance-hero/1920/1080"
        breadcrumbLabel="Travel Insurance"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="What's Covered" title="Comprehensive, Not Complicated" className="mx-0" />
            <div className="mt-8">
              <FeatureList
                items={[
                  "Emergency medical treatment and repatriation",
                  "Trip cancellation and curtailment cover",
                  "Baggage, personal items and money cover",
                  "Pre-existing medical condition options",
                  "Single-trip and annual multi-trip policies",
                  "Family and group policy discounts",
                ]}
              />
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96">
            <Image
              src="https://picsum.photos/seed/travelmark-insurance-side/900/1100"
              alt="Traveller checking documents before a flight"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <CtaBanner />

      <CategoryFaq
        items={[
          {
            question: "Is travel insurance included in your holiday packages?",
            answer: "Insurance isn't automatically bundled but is offered at the point of booking — we strongly recommend it for every trip, particularly flight-inclusive packages.",
          },
          {
            question: "Can I get cover for pre-existing medical conditions?",
            answer: "Yes, we work with providers who can quote for most pre-existing conditions — declare these during the quote process for accurate cover.",
          },
          {
            question: "What's the difference between single-trip and annual cover?",
            answer: "Single-trip covers one journey; annual multi-trip covers unlimited trips within a year, usually cheaper if you travel more than twice a year.",
          },
        ]}
      />
    </>
  );
}
