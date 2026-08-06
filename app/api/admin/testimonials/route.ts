import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, saveTestimonials } from "@/lib/data";
import type { Testimonial } from "@/types";

export async function GET() {
  return NextResponse.json(await getTestimonials());
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Testimonial>;
  const testimonials = await getTestimonials();

  const newTestimonial: Testimonial = {
    id: `t${Date.now()}`,
    name: body.name ?? "Anonymous",
    location: body.location ?? "United Kingdom",
    rating: Number(body.rating) || 5,
    quote: body.quote ?? "",
    trip: body.trip ?? "",
    avatar: body.avatar || "https://i.pravatar.cc/150?img=1",
  };

  testimonials.unshift(newTestimonial);
  await saveTestimonials(testimonials);
  return NextResponse.json(newTestimonial, { status: 201 });
}
