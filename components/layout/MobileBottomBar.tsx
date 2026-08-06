"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plane, Tag, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/flights", label: "Flights", icon: Plane },
  { href: "/special-offers", label: "Offers", icon: Tag },
  { href: "/contact", label: "Contact", icon: User },
];

/** Mobile-only bottom tab bar for fast, thumb-reachable navigation. */
export function MobileBottomBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="Mobile primary"
      className="glass-surface fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-navy-900/8 shadow-[0_-4px_20px_rgba(7,27,51,0.06)] dark:border-white/10 md:hidden"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 text-[11px] font-medium",
              active ? "text-royal-600 dark:text-sky-400" : "text-navy-900/50 dark:text-white/50"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
      <a
        href={COMPANY.phoneHref}
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-navy-900/50 dark:text-white/50"
      >
        <Phone className="h-5 w-5" />
        Call
      </a>
    </nav>
  );
}
