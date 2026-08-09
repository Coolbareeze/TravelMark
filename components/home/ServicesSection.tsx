"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Plane, Hotel, FileCheck2, ShieldCheck, Car, Briefcase,
  Users, Moon, Anchor, GraduationCap, Building2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import Link from "next/link";

const services = [
  { icon: Plane, title: "Flight Booking", desc: "Best fares across 500+ airlines worldwide.", href: "/flights", seed: "flight" },
  { icon: Hotel, title: "Holiday Packages", desc: "Flight + hotel bundles, fully protected.", href: "/holiday-packages", seed: "holiday" },
  { icon: Building2, title: "Hotels", desc: "Handpicked stays from boutique to five-star.", href: "/holiday-packages", seed: "hotel" },
  { icon: FileCheck2, title: "Visa Assistance", desc: "End-to-end visa applications, done for you.", href: "/visa-services", seed: "visa" },
  { icon: ShieldCheck, title: "Travel Insurance", desc: "Comprehensive cover for total peace of mind.", href: "/travel-insurance", seed: "insurance" },
  { icon: Car, title: "Airport Transfers", desc: "Private, reliable transfers at every destination.", href: "/holiday-packages", seed: "transfer" },
  { icon: Briefcase, title: "Business Travel", desc: "Dedicated accounts for corporate travellers.", href: "/business-travel", seed: "business" },
  { icon: Users, title: "Group Travel", desc: "Seamless coordination for groups of any size.", href: "/contact", seed: "group" },
  { icon: Moon, title: "Hajj & Umrah", desc: "Fully guided, scholar-led sacred journeys.", href: "/umrah-hajj", seed: "umrah" },
  { icon: Anchor, title: "Cruise Holidays", desc: "Ocean and river cruises across the globe.", href: "/luxury-holidays", seed: "cruise" },
  { icon: GraduationCap, title: "Student Travel", desc: "Budget-friendly fares for students and gap years.", href: "/flights", seed: "student" },
  { icon: Briefcase, title: "Corporate Accounts", desc: "Dedicated account managers and consolidated billing.", href: "/business-travel", seed: "corporate" },
];

interface ServicesSectionProps {
  /** Dark, high-contrast treatment with photo imagery — opt-in so the
   * live site (plain white section, icon-only cards) is untouched; only
   * /home1 passes this. */
  contrast?: boolean;
}

export function ServicesSection({ contrast = false }: ServicesSectionProps) {
  return (
    <section className={cn("section", contrast ? "bg-navy-900" : "bg-white dark:bg-navy-950")}>
      <div className="container">
        <SectionHeading
          eyebrow="What We Do"
          title="A Full-Service Travel Consultancy"
          description="Everything you need for effortless, well-protected travel — handled by one dedicated team."
          light={contrast}
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
            >
              <Link
                href={service.href}
                className={cn(
                  "card-lift group flex h-full flex-col overflow-hidden rounded-xl2 border",
                  contrast
                    ? "border-white/10 bg-white/5"
                    : "border-navy-900/8 bg-surface dark:border-white/10 dark:bg-white/5"
                )}
              >
                {contrast && (
                  <div className="relative h-28 w-full overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/travelmark-service-${service.seed}/400/280`}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 90vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy-950/35" />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl2 transition-colors",
                      contrast
                        ? "-mt-12 bg-gold-500 text-navy-900 group-hover:bg-gold-400"
                        : "bg-navy-900 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-900"
                    )}
                  >
                    <service.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className={cn("font-heading font-bold", contrast ? "text-white" : "text-navy-900 dark:text-white")}>
                      {service.title}
                    </h3>
                    <p className={cn("mt-1 text-sm leading-relaxed", contrast ? "text-white/60" : "text-navy-700/70 dark:text-white/60")}>
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
