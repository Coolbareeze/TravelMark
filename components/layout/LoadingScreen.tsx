"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/** Elegant one-time entry loader — plays on first paint, then never again this session. */
export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alreadyShown = window.sessionStorage.getItem("travelmark-loaded");
    if (alreadyShown) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      window.sessionStorage.setItem("travelmark-loaded", "1");
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950"
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/images/logo-icon.png" alt="" width={44} height={37} priority />
            </motion.div>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Travel Mark
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
