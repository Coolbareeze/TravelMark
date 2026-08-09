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

// TEMPORARY PREVIEW ROUTE — not linked from navigation, excluded from
// search indexing. Renders the real homepage sections wrapped in the
// `.theme-preview` class, which now swaps every navy/gold color token to
// the OFFICIAL TravelMark brand colors (Pantone 7752 C gold #D4AF37 +
// Pantone 426 C charcoal #2B2B2D, straight from the brand guidelines PDF
// and business card) via CSS variables (see globals.css). No other page
// or component is affected — this file can be safely deployed to
// production and deleted once a decision is made.
export const metadata: Metadata = buildMetadata({
  title: "Color Scheme Preview",
  description: "Temporary internal preview — not part of the live site.",
  path: "/home1",
  noIndex: true,
});

export default function Home1PreviewPage() {
  // Theming is applied by SiteChrome (wraps header/footer/main together
  // in `.theme-preview` when the route is /home1) — this page just renders
  // the same real homepage sections used on the live site.
  return (
    <>
      <div className="relative z-[200] bg-gold-500 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-navy-950">
        Preview only — official brand color scheme (from the logo &amp; brand guidelines). Not linked from the site, not indexed.
      </div>
      <Hero />
      <DestinationsSection />
      <PackagesSection />
      <AirlinesSection contrast />
      <ServicesSection contrast />
      <WhyChooseUsSection />
      <CtaBanner />
      <TestimonialsSection contrast />
      <BlogTeaserSection />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}
