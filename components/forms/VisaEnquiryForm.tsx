"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { visaEnquirySchema, type VisaEnquiryValues } from "@/lib/validations";
import { FieldWrapper, Input, Textarea, Honeypot } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";

export function VisaEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VisaEnquiryValues>({ resolver: zodResolver(visaEnquirySchema) });

  async function onSubmit(values: VisaEnquiryValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/visa-enquiry", {
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
        title="Enquiry received"
        message="Our visa team will review your requirements and respond with next steps within one working day."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Full Name" htmlFor="v-name" required error={errors.name?.message}>
          <Input id="v-name" {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Email Address" htmlFor="v-email" required error={errors.email?.message}>
          <Input id="v-email" type="email" {...register("email")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Phone Number" htmlFor="v-phone" required error={errors.phone?.message}>
          <Input id="v-phone" type="tel" {...register("phone")} />
        </FieldWrapper>
        <FieldWrapper label="Nationality" htmlFor="v-nationality" required error={errors.nationality?.message}>
          <Input id="v-nationality" {...register("nationality")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper
          label="Destination Country"
          htmlFor="v-destination"
          required
          error={errors.destinationCountry?.message}
        >
          <Input id="v-destination" placeholder="e.g. Saudi Arabia, USA..." {...register("destinationCountry")} />
        </FieldWrapper>
        <FieldWrapper label="Planned Travel Date" htmlFor="v-date">
          <Input id="v-date" type="date" {...register("travelDate")} />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Notes" htmlFor="v-notes">
        <Textarea id="v-notes" placeholder="Purpose of travel, visa type, urgency..." {...register("notes")} />
      </FieldWrapper>
      <Honeypot register={register} />
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again or call us directly.</p>
      )}
      <Button type="submit" disabled={status === "loading"} size="lg" className="w-full sm:w-auto">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Submit Visa Enquiry
      </Button>
    </form>
  );
}
