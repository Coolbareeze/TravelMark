import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAirlines } from "@/lib/data";
import { cn } from "@/lib/utils";

interface AirlinesSectionProps {
  /** Dark, high-contrast treatment — opt-in so the live site (bg-surface,
   * as before) is untouched; only /home1 passes this. */
  contrast?: boolean;
}

export async function AirlinesSection({ contrast = false }: AirlinesSectionProps) {
  const airlines = await getAirlines();
  const marqueeList = [...airlines, ...airlines];

  return (
    <section className={cn("section", contrast ? "bg-navy-900" : "bg-surface dark:bg-navy-900")}>
      <div className="container">
        <SectionHeading
          eyebrow="Our Airline Partners"
          title="Flying With the World's Finest Carriers"
          description="We hold direct trading relationships with premium airlines across the Middle East, Africa, Europe and Asia."
          light={contrast}
        />
      </div>
      <div className="relative mt-14 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent",
            contrast ? "from-navy-900" : "from-surface dark:from-navy-900"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent",
            contrast ? "from-navy-900" : "from-surface dark:from-navy-900"
          )}
        />
        <div className="flex w-max animate-marquee gap-4 [animation-play-state:running] hover:[animation-play-state:paused]">
          {marqueeList.map((airline, i) => (
            <div
              key={`${airline.id}-${i}`}
              className={cn(
                "flex h-24 w-52 flex-shrink-0 items-center justify-center rounded-xl2 border bg-white px-6 shadow-soft",
                contrast ? "border-white/10" : "border-navy-900/8 dark:border-white/10 dark:bg-navy-800"
              )}
            >
              <Image
                src={airline.logo}
                alt={airline.name}
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
