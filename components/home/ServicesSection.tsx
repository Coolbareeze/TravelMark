"use client";

import { motion } from "framer-motion";
import {
  Plane, Hotel, FileCheck2, ShieldCheck, Car, Briefcase,
  Users, Moon, Anchor, GraduationCap, Building2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

const services = [
  { icon: Plane, title: "Flight Booking", desc: "Best fares across 500+ airlines worldwide.", href: "/flights" },
  { icon: Hotel, title: "Holiday Packages", desc: "Flight + hotel bundles, fully protected.", href: "/holiday-packages" },
  { icon: Building2, title: "Hotels", desc: "Handpicked stays from boutique to five-star.", href: "/holiday-packages" },
  { icon: FileCheck2, title: "Visa Assistance", desc: "End-to-end visa applications, done for you.", href: "/visa-services" },
  { icon: ShieldCheck, title: "Travel Insurance", desc: "Comprehensive cover for total peace of mind.", href: "/travel-insurance" },
  { icon: Car, title: "Airport Transfers", desc: "Private, reliable transfers at every destination.", href: "/holiday-packages" },
  { icon: Briefcase, title: "Business Travel", desc: "Dedicated accounts for corporate travellers.", href: "/business-travel" },
  { icon: Users, title: "Group Travel", desc: "Seamless coordination for groups of any size.", href: "/contact" },
  { icon: Moon, title: "Hajj & Umrah", desc: "Fully guided, scholar-led sacred journeys.", href: "/umrah-hajj" },
  { icon: Anchor, title: "Cruise Holidays", desc: "Ocean and river cruises across the globe.", href: "/luxury-holidays" },
  { icon: GraduationCap, title: "Student Travel", desc: "Budget-friendly fares for students and gap years.", href: "/flights" },
  { icon: Briefcase, title: "Corporate Accounts", desc: "Dedicated account managers and consolidated billing.", href: "/business-travel" },
];

export function ServicesSection() {
  return (
    <section className="section bg-white dark:bg-navy-950">
      <div className="container">
        <SectionHeading
          eyebrow="What We Do"
          title="A Full-Service Travel Consultancy"
          description="Everything you need for effortless, well-protected travel — handled by one dedicated team."
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
                className="card-lift group flex h-full flex-col gap-4 rounded-xl2 border border-navy-900/8 bg-surface p-6 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                  <service.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-navy-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-700/70 dark:text-white/60">
                    {service.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
