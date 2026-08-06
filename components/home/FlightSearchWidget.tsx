"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRight, PlaneLanding, PlaneTakeoff, Search, Users2 } from "lucide-react";
import { flightSearchSchema, type FlightSearchValues } from "@/lib/validations";
import { AIRPORTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const tripTypes = [
  { id: "return", label: "Return" },
  { id: "oneway", label: "One Way" },
  { id: "multi", label: "Multi-City" },
] as const;

/** The homepage hero's flight search widget — the site's primary conversion tool. */
export function FlightSearchWidget({ className }: { className?: string }) {
  const router = useRouter();
  const [tripType, setTripType] = useState<FlightSearchValues["tripType"]>("return");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlightSearchValues>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: { tripType: "return", passengers: 1, cabin: "economy" },
  });

  function onSubmit(values: FlightSearchValues) {
    const params = new URLSearchParams({
      tripType,
      origin: values.origin,
      destination: values.destination,
      departureDate: values.departureDate,
      returnDate: values.returnDate ?? "",
      passengers: String(values.passengers),
      cabin: values.cabin,
    });
    router.push(`/flights?${params.toString()}`);
  }

  return (
    <div
      className={cn(
        "w-full rounded-xl3 border border-white/10 bg-white/95 p-5 shadow-elevated backdrop-blur-xl dark:bg-navy-800/95 md:p-7",
        className
      )}
    >
      <div className="mb-5 flex gap-1 rounded-full bg-navy-900/5 p-1 dark:bg-white/10">
        {tripTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTripType(t.id)}
            className={cn(
              "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all",
              tripType === t.id
                ? "bg-navy-900 text-white shadow-soft"
                : "text-navy-700 hover:text-navy-900 dark:text-white/60"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="hidden" value={tripType} {...register("tripType")} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
          <div className="relative md:col-span-2">
            <PlaneTakeoff className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-600" />
            <select
              aria-label="Origin"
              className="h-14 w-full appearance-none rounded-xl2 border border-navy-900/10 bg-white pl-11 pr-4 text-sm font-medium text-navy-900 focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 dark:border-white/15 dark:bg-navy-900 dark:text-white"
              {...register("origin")}
              defaultValue="LON"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city}
                </option>
              ))}
            </select>
          </div>

          <div className="relative md:col-span-2">
            <PlaneLanding className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-600" />
            <select
              aria-label="Destination"
              className="h-14 w-full appearance-none rounded-xl2 border border-navy-900/10 bg-white pl-11 pr-4 text-sm font-medium text-navy-900 focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 dark:border-white/15 dark:bg-navy-900 dark:text-white"
              {...register("destination")}
              defaultValue="DXB"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <input
              type="date"
              aria-label="Departure date"
              className="h-14 w-full rounded-xl2 border border-navy-900/10 bg-white px-4 text-sm font-medium text-navy-900 focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 dark:border-white/15 dark:bg-navy-900 dark:text-white"
              {...register("departureDate")}
            />
          </div>

          <div className="md:col-span-1">
            <input
              type="date"
              aria-label="Return date"
              disabled={tripType === "oneway"}
              className="h-14 w-full rounded-xl2 border border-navy-900/10 bg-white px-4 text-sm font-medium text-navy-900 focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 disabled:opacity-40 dark:border-white/15 dark:bg-navy-900 dark:text-white"
              {...register("returnDate")}
            />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-6">
          <div className="relative md:col-span-2">
            <Users2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-600" />
            <select
              aria-label="Passengers"
              className="h-14 w-full appearance-none rounded-xl2 border border-navy-900/10 bg-white pl-11 pr-4 text-sm font-medium text-navy-900 focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 dark:border-white/15 dark:bg-navy-900 dark:text-white"
              {...register("passengers")}
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Passenger" : "Passengers"}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              aria-label="Cabin class"
              className="h-14 w-full appearance-none rounded-xl2 border border-navy-900/10 bg-white px-4 text-sm font-medium text-navy-900 focus:border-royal-500 focus:ring-2 focus:ring-royal-500/20 dark:border-white/15 dark:bg-navy-900 dark:text-white"
              {...register("cabin")}
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>

          <button
            type="submit"
            className="group flex h-14 items-center justify-center gap-2 rounded-xl2 bg-gold-500 px-6 font-heading font-bold text-navy-900 shadow-gold transition hover:bg-gold-400 md:col-span-2"
          >
            <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
            Search Flights
          </button>
        </div>

        {(errors.origin || errors.destination || errors.departureDate) && (
          <p className="mt-2 text-xs text-red-500">Please complete origin, destination and departure date.</p>
        )}
      </form>

      <button
        type="button"
        className="mt-4 flex items-center gap-1.5 text-xs font-medium text-navy-600 hover:text-royal-600 dark:text-white/50"
      >
        <ArrowLeftRight className="h-3.5 w-3.5" /> Swap origin &amp; destination
      </button>
    </div>
  );
}
