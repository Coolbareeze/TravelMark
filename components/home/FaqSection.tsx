import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

const faqs = [
  {
    question: "Is Travel Mark Ltd ATOL protected?",
    answer:
      "Yes. All flight-inclusive holidays booked through Travel Mark Ltd are ATOL protected, meaning your money and holiday are financially secured in the unlikely event of a supplier failure.",
  },
  {
    question: "Can I get a custom holiday package built for me?",
    answer:
      "Absolutely — our consultants build fully bespoke itineraries around your budget, dates and preferences. Request a free quote and a consultant will call you within one working day.",
  },
  {
    question: "Do you arrange Hajj and Umrah visas?",
    answer:
      "Yes, visa processing is included in every Hajj and Umrah package we sell, along with guided ziyarat tours and an experienced group leader throughout your trip.",
  },
  {
    question: "What happens if my flight is disrupted?",
    answer:
      "Our 24/7 support line means a real consultant — not a chatbot — will rebook or rearrange your itinerary as soon as a disruption occurs, at no extra cost where covered by your fare rules.",
  },
  {
    question: "Do you price-match other UK travel agents?",
    answer:
      "Yes — under our Best Price Guarantee, if you find an identical package cheaper elsewhere within 24 hours of booking, we'll match it or refund the difference.",
  },
];

export function FaqSection() {
  return (
    <section className="section bg-surface dark:bg-navy-900">
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="container max-w-3xl">
        <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions" />
        <div className="mt-12 rounded-xl3 bg-white p-6 shadow-soft dark:bg-navy-800 md:p-10">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
