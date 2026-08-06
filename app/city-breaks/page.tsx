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
  title: "City Breaks — Short Trips to Europe's Finest Cities",
  description:
    "Two, three and four-night city breaks to Paris, Rome, Istanbul and beyond — flights, boutique hotels and guided tours included.",
  path: "/city-breaks",
});

export default async function CityBreaksPage() {
  const packages = await getPackagesByCategory("city-breaks");

  return (
    <>
      <CategoryHero
        eyebrow="City Breaks"
        title="Short Trips, Big Memories"
        description="From a long weekend in Paris to four nights soaking up Istanbul's bazaars, our city breaks are built for maximum experience in minimum time."
        image="https://picsum.photos/seed/travelmark-citybreaks-hero/1920/1080"
        breadcrumbLabel="City Breaks"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="Featured City Breaks"
            title="Where Will Your Weekend Take You?"
            className="mx-0 mb-12"
          />
          <PackageGrid packages={packages} />
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96 lg:order-1">
            <Image
              src="https://picsum.photos/seed/travelmark-citybreaks-side/900/1100"
              alt="Cobbled European city street at golden hour"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading align="left" eyebrow="Built for Short Trips" title="Every Minute, Planned Well" className="mx-0" />
            <div className="mt-8">
              <FeatureList
                items={[
                  "Centrally located, hand-vetted hotels",
                  "Guided walking tours and skip-the-line access",
                  "Flights timed to maximise your time on the ground",
                  "Restaurant and experience recommendations included",
                  "Ideal for anniversaries, birthdays and reunions",
                  "Flexible 2-5 night durations",
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
            question: "How many nights is a typical city break?",
            answer: "Most of our city breaks run 2-4 nights, though we can extend any itinerary to suit your schedule.",
          },
          {
            question: "Are city breaks suitable for solo travellers?",
            answer: "Yes — many of our city break guests travel solo. We can also match you with small group departures if you'd prefer company.",
          },
          {
            question: "Can I add extra excursions once booked?",
            answer: "Absolutely, your consultant can add museum tickets, food tours or day trips at any point before departure.",
          },
        ]}
      />
    </>
  );
}
