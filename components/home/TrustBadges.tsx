"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, BadgePoundSterling, Lock } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const icons = [ShieldCheck, Clock, BadgePoundSterling, Lock];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {TRUST_BADGES.map((badge, i) => {
        const Icon = icons[i];
        return (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-start gap-2 rounded-xl2 bg-white/10 p-4 backdrop-blur-md md:p-5"
          >
            <Icon className="h-6 w-6 text-gold-400" />
            <p className="text-sm font-semibold text-white">{badge.title}</p>
            <p className="hidden text-xs leading-snug text-white/60 md:block">{badge.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
