import type { Metadata } from "next";
import Image from "next/image";
import { CategoryHero } from "@/components/category/CategoryHero";
import { PackageGrid } from "@/components/category/PackageGrid";
import { FeatureList } from "@/components/category/FeatureList";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPackages } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Holiday Packages — Flight + Hotel Deals",
  description:
    "Browse ATOL-protected holiday packages combining flights, hotels and transfers. Transparent pricing, no hidden fees, personal consultant support.",
  path: "/holiday-packages",
});

export default async function HolidayPackagesPage() {
  const packages = await getPackages();

  return (
    <>
      <CategoryHero
        eyebrow="Holiday Packages"
        title="Flight + Hotel Packages, Perfectly Bundled"
        description="Every package includes ATOL-protected flights, handpicked hotels and clear, all-in pricing — built around the way you actually want to travel."
        image="https://picsum.photos/seed/travelmark-packages-hero/1920/1080"
        breadcrumbLabel="Holiday Packages"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="Full Range"
            title="Every Package, One Place"
            description="Filter by destination or browse our full range below — every package is fully customisable."
            className="mx-0 mb-12"
          />
          <PackageGrid packages={packages} />
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Book a Package"
              title="One Booking. Total Peace of Mind."
              className="mx-0"
            />
            <div className="mt-8">
              <FeatureList
                items={[
                  "ATOL-protected flights and accommodation",
                  "Transparent, all-in pricing — no surprise fees",
                  "Airport transfers arranged for you",
                  "24/7 in-destination support",
                  "Flexible payment plans available",
                  "Dedicated consultant from booking to return",
                ]}
              />
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl3 shadow-elevated md:h-96">
            <Image
              src="https://picsum.photos/seed/travelmark-packages-side/900/1100"
              alt="Couple relaxing at a luxury resort"
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
            question: "Can I customise a holiday package?",
            answer:
              "Yes — every package on this page is a starting point. Tell us your dates, budget and preferences and we'll tailor the hotel, board basis or duration to match.",
          },
          {
            question: "Are your packages ATOL protected?",
            answer:
              "All flight-inclusive packages are ATOL protected, meaning your money and holiday are financially secured under UK regulation.",
          },
          {
            question: "How far in advance should I book?",
            answer:
              "For the best rates, we recommend booking 3-6 months ahead for peak season travel, though we regularly secure great last-minute deals too.",
          },
        ]}
      />
    </>
  );
}
