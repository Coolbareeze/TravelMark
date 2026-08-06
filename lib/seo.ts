import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelmark.co.uk";

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

/** Build a fully-populated Next.js Metadata object for a page. */
export function buildMetadata({ title, description, path, image, noIndex }: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  // Falls back to a stock placeholder until a branded /public/images/og-default.jpg is supplied.
  const ogImage = image ?? "https://picsum.photos/seed/travelmark-og/1200/630";

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: COMPANY.name,
      locale: "en_GB",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** schema.org TravelAgency JSON-LD, shared across every page via the root layout. */
export function travelAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    image: "https://picsum.photos/seed/travelmark-og/1200/630",
    telephone: COMPANY.phone,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.line1,
      addressLocality: COMPANY.address.city,
      postalCode: COMPANY.address.postcode,
      addressCountry: "GB",
    },
    sameAs: Object.values(COMPANY.social),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY.trust.googleRating,
      reviewCount: COMPANY.trust.googleReviewCount,
    },
  };
}

/** schema.org BreadcrumbList JSON-LD builder. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** schema.org FAQPage JSON-LD builder. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
