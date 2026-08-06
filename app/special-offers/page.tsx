import type { Metadata } from "next";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CategoryFaq } from "@/components/category/CategoryFaq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCard } from "@/components/home/PackageCard";
import { OfferCountdown } from "@/components/ui/OfferCountdown";
import { Badge } from "@/components/ui/Badge";
import { getCurrentOffers } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Special Offers — Limited-Time Holiday Deals",
  description:
    "Time-limited flight and holiday offers with real savings — book before they're gone. Updated regularly by our travel consultants.",
  path: "/special-offers",
});

export default async function SpecialOffersPage() {
  const offers = await getCurrentOffers();
  const timedOffers = offers.filter((o) => o.offerEndsAt);

  return (
    <>
      <CategoryHero
        eyebrow="Special Offers"
        title="Deals Worth Booking Today"
        description="Genuine, time-limited savings on flights and holidays — reviewed weekly by our consultants."
        image="https://picsum.photos/seed/travelmark-offers-hero/1920/1080"
        breadcrumbLabel="Special Offers"
      />

      {timedOffers.length > 0 && (
        <section className="bg-navy-950 py-4">
          <div className="container flex flex-wrap items-center justify-center gap-4 text-center text-sm text-white/80 md:justify-between">
            <p className="font-heading font-semibold text-gold-400">
              ⚡ {timedOffers.length} offers ending soon
            </p>
            <OfferCountdown endsAt={timedOffers[0].offerEndsAt!} />
          </div>
        </section>
      )}

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="Live Now"
            title="This Week's Best Savings"
            className="mx-0 mb-12"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((pkg, i) => (
              <div key={pkg.id} className="relative">
                <PackageCard pkg={pkg} index={i} />
                {pkg.offerEndsAt && (
                  <div className="mt-3 flex items-center justify-between rounded-xl2 bg-navy-900/5 p-3 dark:bg-white/5">
                    <Badge tone="success">Ends Soon</Badge>
                    <OfferCountdown endsAt={pkg.offerEndsAt} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />

      <CategoryFaq
        items={[
          {
            question: "How often are special offers updated?",
            answer: "Our consultants review and refresh special offers weekly, pulling in new negotiated rates as soon as they become available.",
          },
          {
            question: "Can I combine an offer with a custom itinerary change?",
            answer: "In most cases yes — let your consultant know which offer caught your eye and how you'd like it adjusted, and they'll confirm what's possible.",
          },
          {
            question: "What happens if an offer expires before I book?",
            answer: "Get in touch anyway — we can often source a similar rate or let you know when the next comparable offer is likely to appear.",
          },
        ]}
      />
    </>
  );
}
