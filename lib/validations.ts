import { z } from "zod";

// Shared honeypot field — real users never fill this in; bots usually do.
const honeypot = z.string().max(0, "Spam detected").optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  subject: z.string().min(2, "Please add a subject"),
  message: z.string().min(10, "Please add a little more detail (10+ characters)"),
  website: honeypot,
});
export type ContactValues = z.infer<typeof contactSchema>;

export const quoteRequestSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  destination: z.string().min(2, "Tell us where you'd like to go"),
  departureDate: z.string().min(1, "Please choose a departure date"),
  travellers: z.coerce.number().min(1).max(20),
  budget: z.string().optional(),
  notes: z.string().optional(),
  website: honeypot,
});
export type QuoteRequestValues = z.infer<typeof quoteRequestSchema>;

export const holidayEnquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  packageName: z.string().optional(),
  preferredDates: z.string().min(1, "Let us know roughly when you'd like to travel"),
  travellers: z.coerce.number().min(1).max(20),
  message: z.string().optional(),
  website: honeypot,
});
export type HolidayEnquiryValues = z.infer<typeof holidayEnquirySchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  website: honeypot,
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;

export const visaEnquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  nationality: z.string().min(2, "Please enter your nationality"),
  destinationCountry: z.string().min(2, "Which country do you need a visa for?"),
  travelDate: z.string().optional(),
  notes: z.string().optional(),
  website: honeypot,
});
export type VisaEnquiryValues = z.infer<typeof visaEnquirySchema>;

export const corporateTravelSchema = z.object({
  companyName: z.string().min(2, "Please enter your company name"),
  contactName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  employeeCount: z.string().min(1, "Please select an approximate team size"),
  requirements: z.string().min(10, "Please add a little more detail (10+ characters)"),
  website: honeypot,
});
export type CorporateTravelValues = z.infer<typeof corporateTravelSchema>;

export const flightSearchSchema = z.object({
  tripType: z.enum(["return", "oneway", "multi"]),
  origin: z.string().min(1, "Please choose a departure airport"),
  destination: z.string().min(1, "Please choose a destination"),
  departureDate: z.string().min(1, "Please choose a departure date"),
  returnDate: z.string().optional(),
  passengers: z.coerce.number().min(1).max(9),
  cabin: z.enum(["economy", "premium", "business", "first"]),
});
export type FlightSearchValues = z.infer<typeof flightSearchSchema>;
