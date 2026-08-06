import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PackageCard } from "@/components/home/PackageCard";
import { getFeaturedPackages } from "@/lib/data";

export async function PackagesSection() {
  const packages = await getFeaturedPackages();

  return (
    <section className="section bg-white dark:bg-navy-950">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Curated for you"
            title="Featured Holiday Packages"
            description="Fully bonded flight + hotel packages with transparent, all-in pricing — no hidden extras."
            className="mx-0"
          />
          <Button href="/holiday-packages" variant="outline">
            Browse All Packages
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
