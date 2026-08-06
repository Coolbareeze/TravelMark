import type { Metadata } from "next";
import Image from "next/image";
import { CategoryHero } from "@/components/category/CategoryHero";
import { FeatureList } from "@/components/category/FeatureList";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CorporateTravelForm } from "@/components/forms/CorporateTravelForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Business Travel — Corporate Accounts & Managed Travel",
  description:
    "Dedicated corporate travel accounts with consolidated billing, 24/7 support and negotiated fares for UK businesses of every size.",
  path: "/business-travel",
});

export default function BusinessTravelPage() {
  return (
    <>
      <CategoryHero
        eyebrow="Business Travel"
        title="Corporate Travel, Properly Managed"
        description="From single business trips to full travel programmes, we give your team negotiated fares, one point of contact and total visibility on spend."
        image="https://picsum.photos/seed/travelmark-business-hero/1920/1080"
        breadcrumbLabel="Business Travel"
        ctaLabel="Talk to Our Corporate Team"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Corporate Accounts" title="Built for Business, Run by People" className="mx-0" />
            <div className="mt-8">
              <FeatureList
                items={[
                  "Dedicated account manager for your business",
                  "Consolidated monthly invoicing",
                  "Negotiated corporate fares and lounge access",
                  "Duty-of-care traveller tracking on request",
                  "Out-of-hours emergency rebooking support",
                  "Policy-compliant booking options for every budget",
                ]}
              />
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96">
            <Image
              src="https://picsum.photos/seed/travelmark-business-side/900/1100"
              alt="Business traveller working in an airport lounge"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container max-w-2xl">
          <SectionHeading eyebrow="Get Started" title="Set Up a Corporate Account" />
          <div className="mt-10 rounded-xl3 bg-white p-8 shadow-soft dark:bg-navy-800 md:p-10">
            <CorporateTravelForm />
          </div>
        </div>
      </section>

      <CategoryFaq
        items={[
          {
            question: "Is there a minimum team size for a corporate account?",
            answer: "No — we set up corporate accounts for businesses of every size, from sole traders to large enterprises.",
          },
          {
            question: "Can you enforce our internal travel policy?",
            answer: "Yes, once we understand your travel policy we can flag or restrict out-of-policy bookings and route approvals accordingly.",
          },
          {
            question: "How does billing work?",
            answer: "Most corporate clients receive a single consolidated monthly invoice, though we can also arrange per-trip billing if preferred.",
          },
        ]}
      />
    </>
  );
}
