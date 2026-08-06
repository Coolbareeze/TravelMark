"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Hotel, Plane, Star, Bus } from "lucide-react";
import type { HolidayPackage } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatGBP } from "@/lib/utils";

export function PackageCard({ pkg, index = 0 }: { pkg: HolidayPackage; index?: number }) {
  const discount = pkg.originalPrice
    ? Math.round(100 - (pkg.price / pkg.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-xl3 bg-white shadow-soft dark:bg-navy-800"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {discount && <Badge tone="gold">Save {discount}%</Badge>}
          {pkg.offerEndsAt && <Badge tone="success">Limited Offer</Badge>}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-navy-900 backdrop-blur">
          {Array.from({ length: pkg.hotelRating }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-gold-500 text-gold-500" />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
          {pkg.destination}
        </p>
        <h3 className="mt-1 font-heading text-lg font-bold text-navy-900 dark:text-white">
          {pkg.title}
        </h3>

        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-navy-700/70 dark:text-white/60">
          <li className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-royal-500" /> {pkg.duration}
          </li>
          <li className="flex items-center gap-1.5">
            <Plane className="h-3.5 w-3.5 text-royal-500" /> {pkg.airline}
          </li>
          <li className="col-span-2 flex items-center gap-1.5">
            <Hotel className="h-3.5 w-3.5 text-royal-500" /> {pkg.hotelName}
          </li>
          <li className="col-span-2 flex items-center gap-1.5">
            <Bus className="h-3.5 w-3.5 text-royal-500" />
            {pkg.transfersIncluded ? "Transfers included" : "Transfers not included"}
          </li>
        </ul>

        <div className="mt-6 flex flex-1 items-end justify-between gap-3">
          <div>
            {pkg.originalPrice && (
              <span className="mr-2 text-sm text-navy-400 line-through">
                {formatGBP(pkg.originalPrice)}
              </span>
            )}
            <span className="font-heading text-2xl font-bold text-navy-900 dark:text-white">
              {formatGBP(pkg.price)}
            </span>
            <span className="text-xs text-navy-500 dark:text-white/50"> pp</span>
          </div>
          <Button href={`/holiday-packages/${pkg.slug}`} size="sm">
            View Deal
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
