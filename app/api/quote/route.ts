import { NextRequest, NextResponse } from "next/server";
import { quoteRequestSchema, holidayEnquirySchema } from "@/lib/validations";
import { sendFormNotification } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = checkRateLimit(`quote:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await req.json();
  // Accept either a full quote request or a (shorter) holiday enquiry payload.
  const parsed = quoteRequestSchema.safeParse(body);
  const parsedEnquiry = parsed.success ? null : holidayEnquirySchema.safeParse(body);

  const data = parsed.success ? parsed.data : parsedEnquiry?.success ? parsedEnquiry.data : null;
  if (!data) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  await sendFormNotification("New Quote / Holiday Enquiry", data);
  return NextResponse.json({ ok: true });
}
