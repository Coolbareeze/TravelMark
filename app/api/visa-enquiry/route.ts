import { NextRequest, NextResponse } from "next/server";
import { visaEnquirySchema } from "@/lib/validations";
import { sendFormNotification } from "@/lib/mailer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { allowed } = checkRateLimit(`visa:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = visaEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  await sendFormNotification("New Visa Enquiry", parsed.data);
  return NextResponse.json({ ok: true });
}
