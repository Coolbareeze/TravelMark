"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function SuccessState({ title, message }: { title: string; message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4 rounded-xl3 bg-success-50 px-8 py-12 text-center dark:bg-success-500/10"
      role="status"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
      >
        <CheckCircle2 className="h-14 w-14 text-success-500" strokeWidth={1.5} />
      </motion.div>
      <h3 className="text-xl font-heading font-bold text-navy-900 dark:text-white">{title}</h3>
      <p className="max-w-sm text-navy-700/80 dark:text-white/70">{message}</p>
    </motion.div>
  );
}
