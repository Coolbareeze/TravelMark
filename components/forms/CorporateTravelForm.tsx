"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { corporateTravelSchema, type CorporateTravelValues } from "@/lib/validations";
import { FieldWrapper, Input, Select, Textarea, Honeypot } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";

export function CorporateTravelForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CorporateTravelValues>({ resolver: zodResolver(corporateTravelSchema) });

  async function onSubmit(values: CorporateTravelValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/corporate-travel", {
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
        title="Thanks — we'll be in touch"
        message="A corporate account manager will contact you within one working day to discuss your travel programme."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Company Name" htmlFor="c-company" required error={errors.companyName?.message}>
          <Input id="c-company" {...register("companyName")} />
        </FieldWrapper>
        <FieldWrapper label="Contact Name" htmlFor="c-name" required error={errors.contactName?.message}>
          <Input id="c-name" {...register("contactName")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Work Email" htmlFor="c-email" required error={errors.email?.message}>
          <Input id="c-email" type="email" {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="Phone Number" htmlFor="c-phone" required error={errors.phone?.message}>
          <Input id="c-phone" type="tel" {...register("phone")} />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Approximate Team Size" htmlFor="c-size" required error={errors.employeeCount?.message}>
        <Select id="c-size" {...register("employeeCount")}>
          <option value="">Select team size</option>
          <option value="1-10">1–10 employees</option>
          <option value="11-50">11–50 employees</option>
          <option value="51-200">51–200 employees</option>
          <option value="200+">200+ employees</option>
        </Select>
      </FieldWrapper>
      <FieldWrapper label="Travel Requirements" htmlFor="c-requirements" required error={errors.requirements?.message}>
        <Textarea id="c-requirements" placeholder="Frequency of travel, typical routes, current pain points..." {...register("requirements")} />
      </FieldWrapper>
      <Honeypot register={register} />
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again or call us directly.</p>
      )}
      <Button type="submit" disabled={status === "loading"} size="lg" className="w-full sm:w-auto">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Talk to Our Corporate Team
      </Button>
    </form>
  );
}
