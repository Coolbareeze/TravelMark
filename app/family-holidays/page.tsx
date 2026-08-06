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
  title: "Family Holidays — Stress-Free Trips for All Ages",
  description:
    "Family-friendly holiday packages with kids' clubs, waterparks and spacious rooms — flights, hotels and transfers arranged around your family's needs.",
  path: "/family-holidays",
});

export default async function FamilyHolidaysPage() {
  const packages = await getPackagesByCategory("family-holidays");

  return (
    <>
      <CategoryHero
        eyebrow="Family Holidays"
        title="Holidays the Whole Family Will Talk About"
        description="Kids' clubs, connecting rooms and calm, shallow beaches — we handle the logistics so you can just be present."
        image="https://picsum.photos/seed/travelmark-family-hero/1920/1080"
        breadcrumbLabel="Family Holidays"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading align="left" eyebrow="Family Favourites" title="Built Around Your Family" className="mx-0 mb-12" />
          <PackageGrid packages={packages} />
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Family-First Planning" title="Every Detail, Child-Tested" className="mx-0" />
            <div className="mt-8">
              <FeatureList
                items={[
                  "Kids' clubs and childcare options included",
                  "Connecting and family-sized rooms sourced",
                  "Waterpark and activity passes bundled in",
                  "Advice on the best times to fly with children",
                  "Travel insurance covering the whole family",
                  "Support with buggies, cots and dietary needs",
                ]}
              />
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96">
            <Image
              src="https://picsum.photos/seed/travelmark-family-side/900/1100"
              alt="Family playing on the beach together"
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
            question: "What age range do kids' clubs typically cover?",
            answer: "Most resort kids' clubs cater for ages 4-12, with teen clubs increasingly common at family resorts — we'll confirm exact ages for your chosen hotel.",
          },
          {
            question: "Can you book connecting or adjoining rooms?",
            answer: "Yes, we always request connecting or adjoining rooms for families and confirm availability directly with the hotel before you travel.",
          },
          {
            question: "Do you offer family travel insurance?",
            answer: "We can arrange family travel insurance policies that cover all children under 18 at no extra cost on most plans.",
          },
        ]}
      />
    </>
  );
}
