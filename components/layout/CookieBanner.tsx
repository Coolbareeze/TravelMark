"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "travelmark-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept(all: boolean) {
    window.localStorage.setItem(STORAGE_KEY, all ? "all" : "essential");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl rounded-xl3 border border-navy-900/10 bg-white/95 p-6 shadow-elevated backdrop-blur dark:border-white/10 dark:bg-navy-800/95 md:inset-x-auto md:right-6"
        >
          <p className="text-sm leading-relaxed text-navy-800 dark:text-white/80">
            We use cookies to improve your experience, personalise content and analyse traffic.
            Read our{" "}
            <Link href="/cookie-policy" className="font-semibold text-royal-600 underline dark:text-sky-400">
              Cookie Policy
            </Link>{" "}
            to learn more.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" variant="primary" onClick={() => accept(true)}>
              Accept All
            </Button>
            <Button size="sm" variant="outline" onClick={() => accept(false)}>
              Essential Only
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
