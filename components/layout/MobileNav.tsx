"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { NAV, COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-white p-6 shadow-elevated dark:bg-navy-900 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 hover:bg-navy-900/5 dark:text-white dark:hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-8 flex-1 space-y-1 overflow-y-auto" aria-label="Mobile primary">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-navy-900/8 py-1 dark:border-white/10">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-3 font-heading text-lg font-semibold text-navy-900 dark:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="flex w-full items-center justify-between py-3 font-heading text-lg font-semibold text-navy-900 dark:text-white"
                        onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                        aria-expanded={openGroup === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            openGroup === item.label && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openGroup === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-2"
                          >
                            {item.columns?.map((col) => (
                              <div key={col.heading} className="mb-3">
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold-600">
                                  {col.heading}
                                </p>
                                {col.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onClose}
                                    className="block py-2 text-[0.95rem] text-navy-800 dark:text-white/80"
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 space-y-4">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-navy-900 dark:text-white"
              >
                <Phone className="h-4 w-4 text-gold-600" />
                {COMPANY.phone}
              </a>
              <Button href="/contact" variant="gold" className="w-full" onClick={onClose}>
                Get a Free Quote
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
