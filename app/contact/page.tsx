import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { CategoryHero } from "@/components/category/CategoryHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/constants";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Speak to a Travel Consultant",
  description:
    "Contact Travel Mark Ltd by phone, WhatsApp or email, or visit our Birmingham office. Request a free holiday quote today.",
  path: "/contact",
});

const mapQuery = encodeURIComponent(COMPANY.address.full);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />

      <CategoryHero
        eyebrow="Contact Us"
        title="Let's Plan Your Next Trip"
        description="Call, WhatsApp or send an enquiry — a real consultant replies within one working day, usually much sooner."
        image="https://picsum.photos/seed/travelmark-contact-hero/1920/1080"
        breadcrumbLabel="Contact"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <ContactCard icon={Phone} title="Call Us" value={COMPANY.phone} href={COMPANY.phoneHref} />
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              value="Chat with a consultant"
              href={`${COMPANY.whatsappHref}`}
            />
            <ContactCard icon={Mail} title="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
            <ContactCard icon={MapPin} title="Office" value={COMPANY.address.full} />
            <div className="rounded-xl2 border border-navy-900/8 bg-surface p-5 dark:border-white/10 dark:bg-white/5">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy-900 dark:text-white">
                <Clock className="h-4 w-4 text-gold-600" /> Opening Hours
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-navy-700/70 dark:text-white/60">
                {COMPANY.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-10 overflow-hidden rounded-xl3 shadow-soft">
              <iframe
                title="Travel Mark Ltd office location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>

            <div id="contact-form" className="rounded-xl3 bg-surface p-8 shadow-soft dark:bg-white/5 md:p-10">
              <SectionHeading align="left" eyebrow="General Enquiries" title="Send Us a Message" className="mx-0 mb-8" />
              <ContactForm />
            </div>

            <div id="quote-form" className="mt-10 rounded-xl3 bg-navy-900 p-8 shadow-soft md:p-10">
              <SectionHeading light align="left" eyebrow="Planning a Trip?" title="Request a Free Quote" className="mx-0 mb-8" />
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-xl2 border border-navy-900/8 bg-surface p-5 transition hover:border-royal-500/30 dark:border-white/10 dark:bg-white/5">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-navy-900 dark:text-white">{title}</p>
        <p className="mt-0.5 text-sm text-navy-600 dark:text-white/60">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}
