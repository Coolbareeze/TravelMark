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
  title: "Luxury Holidays — Five-Star Escapes, Curated",
  description:
    "Private villas, five-star resorts and first-class flights — bespoke luxury holidays designed and booked by dedicated Travel Mark consultants.",
  path: "/luxury-holidays",
});

export default async function LuxuryHolidaysPage() {
  const packages = await getPackagesByCategory("luxury-holidays");

  return (
    <>
      <CategoryHero
        eyebrow="Luxury Holidays"
        title="Exceptional Travel, Without Compromise"
        description="From private overwater villas to Alpine chalets, our luxury desk designs journeys around exacting standards — yours."
        image="https://picsum.photos/seed/travelmark-luxury-hero/1920/1080"
        breadcrumbLabel="Luxury Holidays"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading align="left" eyebrow="Signature Escapes" title="A Selection of Our Finest" className="mx-0 mb-12" />
          <PackageGrid packages={packages} />
        </div>
      </section>

      <section className="section bg-navy-950">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96 lg:order-1">
            <Image
              src="https://picsum.photos/seed/travelmark-luxury-side/900/1100"
              alt="Private infinity pool overlooking the ocean"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading light align="left" eyebrow="The Luxury Desk" title="A Dedicated Concierge From Day One" className="mx-0" />
            <div className="mt-8 [&_span]:text-white/80">
              <FeatureList
                items={[
                  "Private jet and first-class flight sourcing",
                  "Access to exclusive rates at five-star properties",
                  "Personal itinerary designer, not a call centre",
                  "In-destination concierge and 24/7 support",
                  "Bespoke experiences: private tours, chefs, yachts",
                  "Complimentary upgrades through partner relationships",
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
            question: "Can you design a fully bespoke luxury itinerary?",
            answer:
              "Yes, this is our specialty. Share your vision, budget and dates, and our luxury desk will design a complete, private itinerary for your approval.",
          },
          {
            question: "Do you offer private jet charters?",
            answer:
              "We can source and arrange private jet charters for the right occasion, in addition to first and business class on scheduled carriers.",
          },
          {
            question: "What level of support do I get during the trip?",
            answer:
              "Every luxury booking includes a dedicated 24/7 contact who can resolve issues, arrange last-minute changes or book additional experiences on the ground.",
          },
        ]}
      />
    </>
  );
}
