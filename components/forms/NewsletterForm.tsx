"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { newsletterSchema, type NewsletterValues } from "@/lib/validations";
import { Honeypot } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-success-500">
        <CheckCircle2 className="h-5 w-5" /> You're subscribed — welcome aboard.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-sm">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
            className={cn(
              "h-12 w-full rounded-full border px-5 text-sm outline-none transition focus:ring-2 focus:ring-gold-500/40",
              variant === "dark"
                ? "border-white/15 bg-white/5 text-white placeholder:text-white/40"
                : "border-navy-900/12 bg-white text-navy-900 placeholder:text-navy-900/35"
            )}
            {...register("email")}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900 transition hover:bg-gold-400 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
        <Honeypot register={register} />
      </div>
      {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>}
      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
