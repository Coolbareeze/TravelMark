import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, HeartHandshake } from "lucide-react";
import { CategoryHero } from "@/components/category/CategoryHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { CtaBanner } from "@/components/home/CtaBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Our Story, Mission and Team",
  description:
    "Learn about Travel Mark Ltd — a Birmingham-based, ATOL-protected travel agency serving UK travellers with over 15 years of specialist expertise.",
  path: "/about",
});

const team = [
  { name: "Yusuf Ibrahim", role: "Founder & Managing Director", avatar: "https://i.pravatar.cc/300?img=13" },
  { name: "Priya Nair", role: "Head of Holidays & Luxury Travel", avatar: "https://i.pravatar.cc/300?img=47" },
  { name: "James Whitfield", role: "Head of Business Travel", avatar: "https://i.pravatar.cc/300?img=15" },
  { name: "Fatima Ahmed", role: "Umrah & Hajj Programme Lead", avatar: "https://i.pravatar.cc/300?img=44" },
];

const stats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 40, suffix: "+", label: "Countries Served" },
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 120000, suffix: "+", label: "Flights Booked" },
];

export default function AboutPage() {
  return (
    <>
      <CategoryHero
        eyebrow="About Us"
        title="A Travel Agency Built on Trust"
        description="Travel Mark Ltd was founded in Birmingham with one goal: give UK travellers the honest, expert guidance that booking sites can't."
        image="https://picsum.photos/seed/travelmark-about-hero/1920/1080"
        breadcrumbLabel="About Us"
      />

      <section className="section bg-white dark:bg-navy-950">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Our Story" title="From a Birmingham High Street to Nationwide Trust" className="mx-0" />
            <div className="mt-6 space-y-4 text-navy-700/80 dark:text-white/70">
              <p>
                Travel Mark Ltd began on Coventry Road in Birmingham, built by consultants who
                believed travellers deserved more than a search engine and a checkout button.
                Over fifteen years, that belief grew into a full-service travel agency trusted by
                tens of thousands of UK customers.
              </p>
              <p>
                Today we design everything from weekend city breaks to fully guided Umrah
                journeys, always with the same principle: a real person, on the other end of the
                phone, who knows your trip inside out.
              </p>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden rounded-xl3 shadow-elevated">
            <Image
              src="https://picsum.photos/seed/travelmark-about-team/900/1100"
              alt="Travel Mark consultants at the Birmingham office"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section bg-surface dark:bg-navy-900">
        <div className="container grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: "Our Mission", desc: "To make expert, honest travel planning accessible to every UK traveller — without compromise on price or protection." },
            { icon: Eye, title: "Our Vision", desc: "To be the UK's most trusted independent travel consultancy, known for craftsmanship in every itinerary we build." },
            { icon: HeartHandshake, title: "Our Values", desc: "Transparency, genuine care, and a refusal to treat any booking as 'just another transaction'." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl2 bg-white p-8 shadow-soft dark:bg-navy-800">
              <item.icon className="h-8 w-8 text-gold-600" />
              <h3 className="mt-4 font-heading text-lg font-bold text-navy-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70 dark:text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="container mt-16 grid grid-cols-2 gap-8 border-t border-navy-900/10 pt-12 dark:border-white/10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl font-bold text-royal-600 dark:text-gold-400 md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-navy-600 dark:text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-white dark:bg-navy-950">
        <div className="container">
          <SectionHeading eyebrow="Meet the Team" title="The People Behind Your Trip" />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full shadow-soft">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-navy-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-navy-500 dark:text-white/50">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
