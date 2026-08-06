import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { PackagesSection } from "@/components/home/PackagesSection";
import { AirlinesSection } from "@/components/home/AirlinesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogTeaserSection } from "@/components/home/BlogTeaserSection";
import { FaqSection } from "@/components/home/FaqSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Travel Mark Ltd | Premium UK Travel Agency — Flights, Holidays & Umrah",
  description:
    "ATOL-protected UK travel agency offering flights, luxury holidays, Umrah & Hajj packages, city breaks and business travel. Personal consultants, best price guarantee, 24/7 support.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationsSection />
      <PackagesSection />
      <AirlinesSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CtaBanner />
      <TestimonialsSection />
      <BlogTeaserSection />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}
