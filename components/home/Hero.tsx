"use client";

import { motion } from "framer-motion";
import { ChevronDown, PhoneCall, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FlightSearchWidget } from "@/components/home/FlightSearchWidget";
import { TrustBadges } from "@/components/home/TrustBadges";
import { COMPANY } from "@/lib/constants";

/**
 * Full-bleed cinematic hero. A <video> element carries the motion background
 * (drop your file at /public/videos/hero.mp4 — see README "Media Assets");
 * until then the poster image below renders as a graceful, still fallback.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-950">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://picsum.photos/seed/travelmark-hero/1920/1080"
        className="absolute inset-0 h-full w-full object-cover [.theme-preview_&]:grayscale [.theme-preview_&]:contrast-105"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-hero-scrim" />
      <div className="absolute inset-0 bg-noise opacity-40" />

      {/* Floating decorative elements */}
      <motion.div
        aria-hidden
        className="absolute right-[8%] top-[18%] hidden h-24 w-24 rounded-full border border-gold-400/30 md:block"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[6%] bottom-[22%] hidden h-16 w-16 rounded-full bg-gold-500/10 backdrop-blur-md md:block"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container relative z-10 pb-16 pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="eyebrow text-gold-400">
              <span className="h-px w-6 bg-gold-400" />
              ATOL Protected · UK Travel Consultants
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-white/80">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              ))}
              {COMPANY.trust.googleRating} on Google
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-md text-balance text-white md:text-display-xl"
          >
            Travel, elevated.
            <br />
            <span className="text-gold-400">Crafted for you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            From first-class flights to fully guided Umrah journeys, Travel Mark's UK-based
            consultants design every trip with the precision of a private concierge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="/contact" variant="gold" size="lg">
              Get a Free Quote
            </Button>
            <Button href={COMPANY.phoneHref} variant="outline" size="lg" className="!border-white/25 !text-white hover:!bg-white/10">
              <PhoneCall className="h-4 w-4" /> Speak to an Expert
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <FlightSearchWidget />
        </motion.div>

        <div className="mt-12">
          <TrustBadges />
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-white/50" />
      </motion.div>
    </section>
  );
}
