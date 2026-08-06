import { PackageCard } from "@/components/home/PackageCard";
import type { HolidayPackage } from "@/types";

export function PackageGrid({ packages }: { packages: HolidayPackage[] }) {
  if (packages.length === 0) {
    return (
      <p className="rounded-xl2 border border-dashed border-navy-900/15 p-10 text-center text-navy-600 dark:border-white/15 dark:text-white/60">
        New packages for this category are being added — call us and a consultant will build one
        for you today.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} index={i} />
      ))}
    </div>
  );
}
