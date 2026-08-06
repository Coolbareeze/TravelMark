import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAirlines } from "@/lib/data";

export async function AirlinesSection() {
  const airlines = await getAirlines();
  const marqueeList = [...airlines, ...airlines];

  return (
    <section className="section bg-surface dark:bg-navy-900">
      <div className="container">
        <SectionHeading
          eyebrow="Our Airline Partners"
          title="Flying With the World's Finest Carriers"
          description="We hold direct trading relationships with premium airlines across the Middle East, Africa, Europe and Asia."
        />
      </div>
      <div className="relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent dark:from-navy-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent dark:from-navy-900" />
        <div className="flex w-max animate-marquee gap-4 [animation-play-state:running] hover:[animation-play-state:paused]">
          {marqueeList.map((airline, i) => (
            <div
              key={`${airline.id}-${i}`}
              className="flex h-24 w-52 flex-shrink-0 items-center justify-center rounded-xl2 border border-navy-900/8 bg-white px-6 shadow-soft dark:border-white/10 dark:bg-navy-800"
            >
              <Image
                src={airline.logo}
                alt={airline.name}
                width={160}
                height={40}
                className="h-8 w-auto object-contain opacity-80 dark:invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
