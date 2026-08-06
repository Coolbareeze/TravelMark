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
  title: "Beach Holidays — Sun, Sand and All-Inclusive Escapes",
  description:
    "All-inclusive and half-board beach holidays to Zanzibar, Bali and beyond, with flights, transfers and hotels bundled into one transparent price.",
  path: "/beach-holidays",
});

export default async function BeachHolidaysPage() {
  const packages = await getPackagesByCategory("beach-holidays");

  return (
    <>
      <CategoryHero
        eyebrow="Beach Holidays"
        title="Sun, Sand and Nothing Else to Plan"
        description="Turquoise water, powder-white sand and a hotel that does the rest — our beach holidays are built for total switch-off."
        image="https://picsum.photos/seed/travelmark-beach-hero/1920/1080"
        breadcrumbLabel="Beach Holidays"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading align="left" eyebrow="Featured Beach Escapes" title="Find Your Stretch of Sand" className="mx-0 mb-12" />
          <PackageGrid packages={packages} />
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Why Book With Us" title="All-Inclusive, Actually Included" className="mx-0" />
            <div className="mt-8">
              <FeatureList
                items={[
                  "Beachfront and near-beach hotels only",
                  "All-inclusive and half-board options",
                  "Private airport transfers as standard",
                  "Family, couple and solo-friendly resorts",
                  "Snorkelling, diving and water sports add-ons",
                  "Local excursions arranged in advance",
                ]}
              />
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96">
            <Image
              src="https://picsum.photos/seed/travelmark-beach-side/900/1100"
              alt="Overwater villa on a tropical beach"
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
            question: "What's the difference between all-inclusive and half-board?",
            answer:
              "All-inclusive covers all meals, drinks and often activities at your resort. Half-board covers breakfast and dinner, giving you more freedom to explore local restaurants for lunch.",
          },
          {
            question: "Which beach destinations are best for families?",
            answer:
              "Phuket, Zanzibar and the Maldives all offer excellent family-friendly resorts with kids' clubs and shallow, calm waters — ask your consultant for a tailored shortlist.",
          },
          {
            question: "Can you arrange honeymoon upgrades?",
            answer:
              "Yes — we regularly secure complimentary room upgrades, late check-out and romantic dinners for honeymooners. Just let us know when booking.",
          },
        ]}
      />
    </>
  );
}
