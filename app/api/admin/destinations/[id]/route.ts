import { NextRequest, NextResponse } from "next/server";
import { getDestinations, saveDestinations } from "@/lib/data";
import type { Destination } from "@/types";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = (await req.json()) as Partial<Destination>;
  const destinations = await getDestinations();
  const index = destinations.findIndex((d) => d.id === params.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  destinations[index] = {
    ...destinations[index],
    ...body,
    fromPrice: body.fromPrice !== undefined ? Number(body.fromPrice) : destinations[index].fromPrice,
    featured: Boolean(body.featured),
  } as Destination;

  await saveDestinations(destinations);
  return NextResponse.json(destinations[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const destinations = await getDestinations();
  const filtered = destinations.filter((d) => d.id !== params.id);
  if (filtered.length === destinations.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveDestinations(filtered);
  return NextResponse.json({ ok: true });
}
