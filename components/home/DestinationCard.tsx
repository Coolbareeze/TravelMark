"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/types";
import { formatGBP } from "@/lib/utils";

export function DestinationCard({ destination, index = 0 }: { destination: Destination; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/holiday-packages?destination=${destination.slug}`}
        className="card-lift group relative block h-80 overflow-hidden rounded-xl3 shadow-soft"
      >
        <Image
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
            {destination.country}
          </p>
          <div className="mt-1 flex items-end justify-between gap-2">
            <h3 className="font-heading text-xl font-bold text-white">{destination.name}</h3>
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:bg-gold-500 group-hover:text-navy-900">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-1 text-sm text-white/70">
            From <span className="font-semibold text-white">{formatGBP(destination.fromPrice)}</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
