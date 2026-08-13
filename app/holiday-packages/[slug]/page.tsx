import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Hotel, Plane, Bus, Utensils, Star, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { HolidayEnquiryForm } from "@/components/forms/HolidayEnquiryForm";
import { PackageCard } from "@/components/home/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPackageBySlug, getPackages } from "@/lib/data";
import { formatGBP } from "@/lib/utils";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pkg = await getPackageBySlug(params.slug);
  if (!pkg) return {};
  return buildMetadata({
    title: `${pkg.title} — ${pkg.duration} from ${formatGBP(pkg.price)}`,
    description: pkg.description,
    path: `/holiday-packages/${pkg.slug}`,
    image: pkg.image,
  });
}

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = await getPackageBySlug(params.slug);
  if (!pkg) notFound();

  const allPackages = await getPackages();
  const related = allPackages.filter((p) => p.category === pkg.category && p.id !== pkg.id).slice(0, 3);
  // Umrah & Hajj packages get the Islamic (Deep Emerald / Islamic Gold /
  // Warm Ivory) palette, content-only — the header/footer stay in the
  // main brand theme since this route is shared with every other
  // package category and SiteChrome can't see this page's data.
  const isIslamic = pkg.category === "umrah-hajj";

  return (
    <div className={isIslamic ? "theme-islamic" : undefined}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Holiday Packages", path: "/holiday-packages" },
          { name: pkg.title, path: `/holiday-packages/${pkg.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: pkg.title,
          description: pkg.description,
          image: pkg.image,
          offers: {
            "@type": "Offer",
            price: pkg.price,
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
          },
        }}
      />

      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-navy-950">
        <Image src={pkg.image} alt={pkg.title} fill priority className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-hero-scrim" />
        <div className="container relative z-10 pb-12 pt-32">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/holiday-packages" className="hover:text-white">Holiday Packages</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/85">{pkg.title}</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">{pkg.destination}</p>
          <h1 className="mt-2 max-w-2xl text-display-sm text-balance text-white md:text-display-md">
            {pkg.title}
          </h1>
          <div className="mt-4 flex items-center gap-1">
            {Array.from({ length: pkg.hotelRating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
            ))}
            <span className="ml-2 text-sm text-white/70">{pkg.hotelName}</span>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-navy-950">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 rounded-xl2 border border-navy-900/8 bg-surface p-6 dark:border-white/10 dark:bg-white/5 sm:grid-cols-4">
              <div className="text-center">
                <Clock className="mx-auto h-5 w-5 text-royal-500" />
                <p className="mt-2 text-xs font-semibold text-navy-900 dark:text-white">{pkg.duration}</p>
              </div>
              <div className="text-center">
                <Plane className="mx-auto h-5 w-5 text-royal-500" />
                <p className="mt-2 text-xs font-semibold text-navy-900 dark:text-white">{pkg.airline}</p>
              </div>
              <div className="text-center">
                <Bus className="mx-auto h-5 w-5 text-royal-500" />
                <p className="mt-2 text-xs font-semibold text-navy-900 dark:text-white">
                  {pkg.transfersIncluded ? "Transfers Included" : "No Transfers"}
                </p>
              </div>
              <div className="text-center">
                <Utensils className="mx-auto h-5 w-5 text-royal-500" />
                <p className="mt-2 text-xs font-semibold text-navy-900 dark:text-white">{pkg.boardBasis}</p>
              </div>
            </div>

            <div className="mt-10">
              <SectionHeading align="left" eyebrow="Overview" title="About This Package" className="mx-0" />
              <p className="mt-4 leading-relaxed text-navy-700/80 dark:text-white/70">{pkg.description}</p>
            </div>

            <div className="mt-10">
              <h2 className="font-heading text-xl font-bold text-navy-900 dark:text-white">Package Highlights</h2>
              <ul className="mt-4 space-y-3">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-500" />
                    <span className="text-navy-800 dark:text-white/80">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex items-center gap-3 rounded-xl2 bg-royal-50 p-5 text-sm text-royal-800 dark:bg-royal-900/20 dark:text-royal-200">
              <Hotel className="h-5 w-5 flex-shrink-0" />
              Staying at <strong>{pkg.hotelName}</strong> — ask your consultant about room upgrades and honeymoon extras.
            </div>
          </div>

          <div>
            <div className="sticky top-28 rounded-xl3 bg-surface p-6 shadow-soft dark:bg-navy-800 md:p-8">
              <div className="flex items-end justify-between">
                <div>
                  {pkg.originalPrice && (
                    <span className="block text-sm text-navy-400 line-through">
                      {formatGBP(pkg.originalPrice)}
                    </span>
                  )}
                  <span className="font-heading text-3xl font-bold text-navy-900 dark:text-white">
                    {formatGBP(pkg.price)}
                  </span>
                  <span className="text-sm text-navy-500 dark:text-white/50"> per person</span>
                </div>
              </div>
              <div className="mt-6">
                <HolidayEnquiryForm packageName={pkg.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-surface dark:bg-navy-900">
          <div className="container">
            <SectionHeading eyebrow="You May Also Like" title="Similar Packages" />
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((p, i) => (
                <PackageCard key={p.id} pkg={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
