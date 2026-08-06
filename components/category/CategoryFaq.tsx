import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

export function CategoryFaq({ items }: { items: AccordionItem[] }) {
  return (
    <section className="section bg-surface dark:bg-navy-900">
      <JsonLd data={faqJsonLd(items)} />
      <div className="container max-w-3xl">
        <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions" />
        <div className="mt-12 rounded-xl3 bg-white p-6 shadow-soft dark:bg-navy-800 md:p-10">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
