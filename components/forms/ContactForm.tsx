"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/validations";
import { FieldWrapper, Input, Textarea, Honeypot } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
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
        title="Message sent"
        message="Thanks for reaching out — a Travel Mark consultant will reply within one working day."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Full Name" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" placeholder="Jane Doe" {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Email Address" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" placeholder="jane@example.com" {...register("email")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper label="Phone Number" htmlFor="phone" required error={errors.phone?.message}>
          <Input id="phone" type="tel" placeholder="07123 456789" {...register("phone")} />
        </FieldWrapper>
        <FieldWrapper label="Subject" htmlFor="subject" required error={errors.subject?.message}>
          <Input id="subject" placeholder="Holiday enquiry" {...register("subject")} />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Message" htmlFor="message" required error={errors.message?.message}>
        <Textarea id="message" placeholder="Tell us how we can help..." {...register("message")} />
      </FieldWrapper>
      <Honeypot register={register} />
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again or call us directly.</p>
      )}
      <Button type="submit" disabled={status === "loading"} size="lg" className="w-full sm:w-auto">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send Message
      </Button>
    </form>
  );
}
