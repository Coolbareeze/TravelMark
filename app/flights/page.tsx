import type { Metadata } from "next";
import Image from "next/image";
import { FlightSearchWidget } from "@/components/home/FlightSearchWidget";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { AirlinesSection } from "@/components/home/AirlinesSection";
import { formatGBP } from "@/lib/utils";
import { getDestinations } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { AIRPORTS, POPULAR_ROUTES } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Cheap Flights — Compare Fares Across 500+ Airlines",
  description:
    "Search and compare flights to Dubai, Mogadishu, Nairobi, New York and beyond. Best fare guarantee, ATOL protected, 24/7 UK support.",
  path: "/flights",
});

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const destinations = await getDestinations();
  const origin = typeof searchParams.origin === "string" ? searchParams.origin : undefined;
  const destination = typeof searchParams.destination === "string" ? searchParams.destination : undefined;

  const originCity = AIRPORTS.find((a) => a.code === origin)?.city;
  const destinationCity = AIRPORTS.find((a) => a.code === destination)?.city;

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pb-16 pt-32">
        <Image
          src="/images/hero/flights-hero.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-hero-scrim" />
        <div className="container relative z-10">
          <span className="eyebrow text-gold-400">
            <span className="h-px w-6 bg-gold-400" />
            Flights
          </span>
          <h1 className="mt-4 max-w-2xl text-display-sm text-balance text-white md:text-display-md">
            Compare Flights, Book With Confidence
          </h1>
          <p className="mt-4 max-w-xl text-white/75">
            We search hundreds of airlines and fare classes to find you the right flight — not
            just the cheapest one.
          </p>
          <div className="mt-10">
            <FlightSearchWidget />
          </div>
        </div>
      </section>

      {(originCity || destinationCity) && (
        <section className="bg-royal-50 py-6 dark:bg-royal-900/20">
          <div className="container text-center text-sm font-medium text-royal-800 dark:text-royal-200">
            Showing indicative fares {originCity ? `from ${originCity}` : ""}{" "}
            {destinationCity ? `to ${destinationCity}` : ""} — a consultant will confirm live
            pricing and availability within minutes of your enquiry.
          </div>
        </section>
      )}

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="Indicative Fares"
            title="Popular Routes This Month"
            description="Live pricing is confirmed by a consultant at enquiry — these are representative return fares from recent bookings."
            className="mx-0 mb-12"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 8).map((d) => (
              <div
                key={d.id}
                className="card-lift flex items-center justify-between rounded-xl2 border border-navy-900/8 bg-surface p-5 dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <p className="font-heading font-bold text-navy-900 dark:text-white">{d.name}</p>
                  <p className="text-xs text-navy-500 dark:text-white/50">{d.country}</p>
                </div>
                <p className="text-right">
                  <span className="block text-xs text-navy-500 dark:text-white/50">from</span>
                  <span className="font-heading text-lg font-bold text-gold-600">
                    {formatGBP(d.fromPrice)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container">
          <SectionHeading eyebrow="Frequent Routes" title="Popular UK Departures" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {POPULAR_ROUTES.map((route) => (
              <span
                key={route.label}
                className="rounded-full border border-navy-900/10 bg-white px-5 py-2.5 text-sm font-medium text-navy-800 dark:border-white/15 dark:bg-navy-800 dark:text-white/80"
              >
                {route.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AirlinesSection contrast />

      <CategoryFaq
        items={[
          {
            question: "Do you offer live, bookable flight search?",
            answer:
              "Our team confirms live fares and availability directly with airline and GDS partners at enquiry — this keeps pricing accurate and lets us apply negotiated rates you won't find on comparison sites.",
          },
          {
            question: "Can you find flights with specific stopover preferences?",
            answer: "Yes, tell us your stopover or direct-flight preference and we'll prioritise those options when quoting.",
          },
          {
            question: "What if I need to change my flight after booking?",
            answer: "Change policies vary by fare and airline — we'll always explain your options clearly at the time of booking and help manage any changes for you.",
          },
        ]}
      />
    </>
  );
}
