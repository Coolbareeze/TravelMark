import type { Metadata } from "next";
import Image from "next/image";
import { CategoryHero } from "@/components/category/CategoryHero";
import { PackageGrid } from "@/components/category/PackageGrid";
import { FeatureList } from "@/components/category/FeatureList";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPackagesByCategory } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Umrah & Hajj Packages — Guided, Comfortable, Fully Arranged",
  description:
    "Economy to premium Umrah and Hajj packages with Haram-close hotels, visa processing and experienced group leaders. Fully guided from the UK.",
  path: "/umrah-hajj",
});

export default async function UmrahHajjPage() {
  const packages = await getPackagesByCategory("umrah-hajj");

  return (
    <>
      <CategoryHero
        eyebrow="Umrah & Hajj"
        title="A Sacred Journey, Thoughtfully Arranged"
        description="From visa processing to Haram-facing hotels and experienced group leaders, we handle every detail of your Umrah or Hajj journey."
        image="/images/hero/umrah-hero.jpg"
        breadcrumbLabel="Umrah & Hajj"
        ctaLabel="Speak to a Consultant"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading align="left" eyebrow="Our Packages" title="Umrah & Hajj Packages" className="mx-0 mb-12" />
          <PackageGrid packages={packages} />
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96 lg:order-1">
            <Image
              src="/images/hero/umrah-side.jpg"
              alt="The Green Dome of Masjid an-Nabawi, Madinah"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading align="left" eyebrow="Guided With Care" title="Every Rite, Every Step, Supported" className="mx-0" />
            <div className="mt-8">
              <FeatureList
                items={[
                  "Umrah and Hajj visa processing included",
                  "Haram-close or Haram-view hotel options",
                  "Experienced, scholar-led group leaders",
                  "Ziyarat tours in both Makkah and Madinah",
                  "Airport meet & greet and transfers included",
                  "Flexible economy through to premium tiers",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />

      <CategoryFaq
        items={[
          {
            question: "What's included in your Umrah packages?",
            answer:
              "Every Umrah package includes flights, visa processing, accommodation, transfers and a guided ziyarat tour. Higher tiers add Haram-view rooms and full-board meals.",
          },
          {
            question: "How do I apply for a Hajj package?",
            answer:
              "Hajj places are limited and allocated through the official quota system. Register your interest early and our team will guide you through eligibility and documentation.",
          },
          {
            question: "Do you offer group departures?",
            answer:
              "Yes, we run group departures for both Umrah and Hajj with an experienced group leader accompanying travellers throughout the journey.",
          },
          {
            question: "Can I travel with elderly family members?",
            answer:
              "Absolutely — we regularly arrange wheelchair assistance, ground-floor rooms and slower-paced itineraries for elderly or less mobile pilgrims.",
          },
        ]}
      />
    </>
  );
}
