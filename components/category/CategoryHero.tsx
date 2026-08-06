import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CategoryHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbLabel,
  ctaLabel = "Get a Free Quote",
  ctaHref = "/contact",
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  breadcrumbLabel: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-navy-950">
      <Image src={image} alt="" fill priority className="object-cover opacity-70" />
      <div className="absolute inset-0 bg-hero-scrim" />
      <div className="container relative z-10 pb-14 pt-32">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/85">{breadcrumbLabel}</span>
        </nav>
        <span className="eyebrow text-gold-400">
          <span className="h-px w-6 bg-gold-400" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl text-display-sm text-balance text-white md:text-display-md">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-white/75">{description}</p>
        <div className="mt-8">
          <Button href={ctaHref} variant="gold" size="lg">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
