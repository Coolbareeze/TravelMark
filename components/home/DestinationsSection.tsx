import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DestinationCard } from "@/components/home/DestinationCard";
import { getDestinations } from "@/lib/data";

export async function DestinationsSection() {
  const destinations = await getDestinations();
  const shown = destinations.slice(0, 12);

  return (
    <section className="section bg-surface dark:bg-navy-900">
      <div className="container">
        <SectionHeading
          eyebrow="Where next?"
          title="Popular Destinations"
          description="Hand-picked routes our consultants book most — from home-country journeys to bucket-list escapes."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((destination, i) => (
            <DestinationCard key={destination.id} destination={destination} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/holiday-packages" variant="outline" size="lg">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
