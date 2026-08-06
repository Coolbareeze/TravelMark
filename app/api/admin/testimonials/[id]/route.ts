import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, saveTestimonials } from "@/lib/data";
import type { Testimonial } from "@/types";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = (await req.json()) as Partial<Testimonial>;
  const testimonials = await getTestimonials();
  const index = testimonials.findIndex((t) => t.id === params.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  testimonials[index] = {
    ...testimonials[index],
    ...body,
    rating: body.rating !== undefined ? Number(body.rating) : testimonials[index].rating,
  } as Testimonial;

  await saveTestimonials(testimonials);
  return NextResponse.json(testimonials[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const testimonials = await getTestimonials();
  const filtered = testimonials.filter((t) => t.id !== params.id);
  if (filtered.length === testimonials.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveTestimonials(filtered);
  return NextResponse.json({ ok: true });
}
