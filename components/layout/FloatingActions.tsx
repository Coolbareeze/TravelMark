"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { COMPANY } from "@/lib/constants";

/** Floating WhatsApp, Call and Back-to-top buttons — mobile-first, always accessible. */
export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-3 md:bottom-8">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-white shadow-elevated transition hover:bg-navy-800"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={COMPANY.phoneHref}
        aria-label={`Call us on ${COMPANY.phone}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-600 text-white shadow-elevated transition hover:bg-royal-700"
      >
        <Phone className="h-6 w-6" />
      </a>

      <a
        href={`${COMPANY.whatsappHref}?text=${encodeURIComponent("Hi Travel Mark, I'd like some help planning a trip.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-success-500 text-white shadow-elevated transition hover:bg-success-600 animate-pulse-ring"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}
