"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { quoteRequestSchema, type QuoteRequestValues } from "@/lib/validations";
import { FieldWrapper, Input, Select, Textarea, Honeypot } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteRequestValues>({ resolver: zodResolver(quoteRequestSchema) });

  async function onSubmit(values: QuoteRequestValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <SuccessState
        title="Quote request received"
        message="A consultant will call or email you within one working day with a tailored quote."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Full Name" htmlFor="q-name" required error={errors.name?.message}>
          <Input id="q-name" {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Email Address" htmlFor="q-email" required error={errors.email?.message}>
          <Input id="q-email" type="email" {...register("email")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Phone Number" htmlFor="q-phone" required error={errors.phone?.message}>
          <Input id="q-phone" type="tel" {...register("phone")} />
        </FieldWrapper>
        <FieldWrapper label="Destination" htmlFor="q-destination" required error={errors.destination?.message}>
          <Input id="q-destination" placeholder="e.g. Dubai, Maldives..." {...register("destination")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FieldWrapper label="Departure Date" htmlFor="q-date" required error={errors.departureDate?.message}>
          <Input id="q-date" type="date" {...register("departureDate")} />
        </FieldWrapper>
        <FieldWrapper label="Travellers" htmlFor="q-travellers" required error={errors.travellers?.message}>
          <Input id="q-travellers" type="number" min={1} max={20} defaultValue={2} {...register("travellers")} />
        </FieldWrapper>
        <FieldWrapper label="Budget (per person)" htmlFor="q-budget">
          <Select id="q-budget" {...register("budget")}>
            <option value="">No preference</option>
            <option value="under-500">Under £500</option>
            <option value="500-1000">£500 - £1,000</option>
            <option value="1000-2000">£1,000 - £2,000</option>
            <option value="2000-plus">£2,000+</option>
          </Select>
        </FieldWrapper>
      </div>
      <FieldWrapper label="Anything else we should know?" htmlFor="q-notes">
        <Textarea id="q-notes" placeholder="Preferred airline, hotel style, occasion..." {...register("notes")} />
      </FieldWrapper>
      <Honeypot register={register} />
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again or call us directly.</p>
      )}
      <Button type="submit" disabled={status === "loading"} variant="gold" size="lg" className="w-full sm:w-auto">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Request My Free Quote
      </Button>
    </form>
  );
}
