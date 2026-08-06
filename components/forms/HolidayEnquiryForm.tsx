"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { holidayEnquirySchema, type HolidayEnquiryValues } from "@/lib/validations";
import { FieldWrapper, Input, Textarea, Honeypot } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";

export function HolidayEnquiryForm({ packageName }: { packageName?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HolidayEnquiryValues>({
    resolver: zodResolver(holidayEnquirySchema),
    defaultValues: { packageName, travellers: 2 },
  });

  async function onSubmit(values: HolidayEnquiryValues) {
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
        title="Enquiry sent"
        message="A consultant will be in touch shortly to confirm availability and finalise your booking."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {packageName && <input type="hidden" value={packageName} {...register("packageName")} />}
      <FieldWrapper label="Full Name" htmlFor="h-name" required error={errors.name?.message}>
        <Input id="h-name" {...register("name")} />
      </FieldWrapper>
      <FieldWrapper label="Email Address" htmlFor="h-email" required error={errors.email?.message}>
        <Input id="h-email" type="email" {...register("email")} />
      </FieldWrapper>
      <FieldWrapper label="Phone Number" htmlFor="h-phone" required error={errors.phone?.message}>
        <Input id="h-phone" type="tel" {...register("phone")} />
      </FieldWrapper>
      <div className="grid grid-cols-2 gap-4">
        <FieldWrapper label="Preferred Dates" htmlFor="h-dates" required error={errors.preferredDates?.message}>
          <Input id="h-dates" placeholder="e.g. March 2027" {...register("preferredDates")} />
        </FieldWrapper>
        <FieldWrapper label="Travellers" htmlFor="h-travellers" required error={errors.travellers?.message}>
          <Input id="h-travellers" type="number" min={1} max={20} {...register("travellers")} />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Message" htmlFor="h-message">
        <Textarea id="h-message" rows={3} {...register("message")} />
      </FieldWrapper>
      <Honeypot register={register} />
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again.</p>
      )}
      <Button type="submit" disabled={status === "loading"} variant="gold" size="lg" className="w-full">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Enquire Now
      </Button>
    </form>
  );
}
