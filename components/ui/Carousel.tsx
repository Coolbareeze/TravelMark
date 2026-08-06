"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Lightweight, accessible carousel built on Embla.
 * Used for testimonials and destination rails.
 */
export function Carousel({
  children,
  className,
  slideClassName,
  showDots = true,
  showArrows = true,
}: {
  children: React.ReactNode[];
  className?: string;
  slideClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={className}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex">
          {children.map((child, i) => (
            <div key={i} className={cn("min-w-0 flex-shrink-0 flex-grow-0 pl-6", slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {(showArrows || showDots) && (
        <div className="mt-8 flex items-center justify-center gap-6">
          {showArrows && (
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/10 text-navy-900 transition hover:bg-navy-900 hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-navy-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {showDots && (
            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === selectedIndex ? "w-6 bg-gold-500" : "w-2 bg-navy-900/15 dark:bg-white/20"
                  )}
                />
              ))}
            </div>
          )}
          {showArrows && (
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/10 text-navy-900 transition hover:bg-navy-900 hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-navy-900"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
