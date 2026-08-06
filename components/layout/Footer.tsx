import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import {
  COMPANY,
  FOOTER_COMPANY,
  FOOTER_LEGAL,
  FOOTER_ROUTES,
  FOOTER_SERVICES,
  POPULAR_ROUTES,
} from "@/lib/constants";

const socialLinks = [
  { href: COMPANY.social.facebook, icon: Facebook, label: "Facebook" },
  { href: COMPANY.social.instagram, icon: Instagram, label: "Instagram" },
  { href: COMPANY.social.twitter, icon: Twitter, label: "Twitter / X" },
  { href: COMPANY.social.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: COMPANY.social.youtube, icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="container py-10">
        <div className="rounded-xl3 bg-white/5 p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="eyebrow text-gold-400">Stay in the loop</p>
              <h3 className="mt-2 text-2xl font-heading font-bold text-white">
                Exclusive fares, straight to your inbox
              </h3>
            </div>
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-12 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo variant="white" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Travel Mark Ltd is a UK-based, ATOL-protected travel agency crafting flights, holidays
            and Umrah journeys with the care of a private travel consultant.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
              {COMPANY.address.full}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 flex-shrink-0 text-gold-400" />
              <a href={COMPANY.phoneHref} className="hover:text-white">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 flex-shrink-0 text-gold-400" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                {COMPANY.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-gold-400 hover:text-gold-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Holidays" links={FOOTER_ROUTES} />
        <FooterColumn title="Services" links={FOOTER_SERVICES} />
        <FooterColumn title="Company" links={FOOTER_COMPANY} />

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Popular Routes
          </p>
          <ul className="space-y-2.5 text-sm">
            {POPULAR_ROUTES.map((route) => (
              <li key={route.label}>
                <Link href={route.href} className="text-white/60 transition hover:text-gold-400">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wider text-white">
            Opening Hours
          </p>
          <ul className="space-y-1.5 text-sm text-white/60">
            {COMPANY.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-white/80">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 text-xs text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved. {COMPANY.trust.atolNumber}.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LEGAL.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{title}</p>
      <ul className="space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-white/60 transition hover:text-gold-400">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
