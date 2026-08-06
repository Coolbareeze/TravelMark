import Image from "next/image";
import { ShieldCheck, Clock4, BadgePoundSterling, Lock, UserCheck, HeartHandshake, Eye, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";

const points = [
  { icon: ShieldCheck, title: "ATOL Protected", desc: "Every package is fully bonded and financially protected." },
  { icon: Clock4, title: "24/7 Support", desc: "Real consultants on call, whatever the hour or timezone." },
  { icon: BadgePoundSterling, title: "Best Price Guarantee", desc: "Found it cheaper elsewhere? We'll match it." },
  { icon: Lock, title: "Secure Payment", desc: "Bank-grade, PCI-compliant encrypted checkout." },
  { icon: UserCheck, title: "Experienced Consultants", desc: "Average 8+ years' industry experience per consultant." },
  { icon: HeartHandshake, title: "Trusted Service", desc: "Thousands of repeat customers across the UK." },
  { icon: Eye, title: "Transparent Pricing", desc: "No hidden fees — the price you see is the price you pay." },
  { icon: Users, title: "Thousands of Happy Customers", desc: "Rated 4.9/5 from over 2,000 verified reviews." },
];

const stats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 40, suffix: "+", label: "Countries Served" },
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 120000, suffix: "+", label: "Flights Booked" },
];

export function WhyChooseUsSection() {
  return (
    <section className="section relative overflow-hidden bg-navy-950">
      <Image
        src="https://picsum.photos/seed/travelmark-whychooseus/1920/1200"
        alt=""
        fill
        aria-hidden
        className="object-cover opacity-20"
      />
      <div className="container relative">
        <SectionHeading
          light
          eyebrow="Why Travel Mark"
          title="Travel With Total Confidence"
          description="Every booking is backed by financial protection, real human support and a decade of specialist experience."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div
              key={point.title}
              className="card-lift rounded-xl2 border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <point.icon className="h-7 w-7 text-gold-400" />
              <h3 className="mt-4 font-heading font-bold text-white">{point.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{point.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl font-bold text-gold-400 md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
