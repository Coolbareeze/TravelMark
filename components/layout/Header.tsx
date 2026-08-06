"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { NAV, COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-surface shadow-soft" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Logo variant={scrolled ? "default" : "default"} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.columns && setOpenGroup(item.label)}
              onMouseLeave={() => item.columns && setOpenGroup(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                    "text-navy-900 hover:bg-navy-900/5 dark:text-white dark:hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium text-navy-900 transition-colors hover:bg-navy-900/5 dark:text-white dark:hover:bg-white/10"
                  aria-expanded={openGroup === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      openGroup === item.label && "rotate-180"
                    )}
                  />
                </button>
              )}

              <AnimatePresence>
                {item.columns && openGroup === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 rounded-xl3 border border-navy-900/8 bg-white p-6 shadow-elevated dark:border-white/10 dark:bg-navy-800"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {item.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold-600">
                            {col.heading}
                          </p>
                          <ul className="space-y-2.5">
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="text-[0.95rem] text-navy-800 transition hover:text-royal-600 dark:text-white/80 dark:hover:text-sky-400"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={COMPANY.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-navy-900 dark:text-white"
          >
            <Phone className="h-4 w-4 text-gold-600" />
            {COMPANY.phone}
          </a>
          <DarkModeToggle />
          <Button href="/contact" size="sm" variant="gold">
            Get a Free Quote
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-navy-900 lg:hidden dark:text-white"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
