import { NextRequest, NextResponse } from "next/server";
import { getDestinations, saveDestinations } from "@/lib/data";
import { slugify } from "@/lib/utils";
import type { Destination } from "@/types";

export async function GET() {
  return NextResponse.json(await getDestinations());
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Destination>;
  const destinations = await getDestinations();

  const newDestination: Destination = {
    id: `d${Date.now()}`,
    slug: body.slug?.trim() || slugify(body.name ?? "new-destination"),
    name: body.name ?? "Untitled",
    country: body.country ?? "",
    region: (body.region as Destination["region"]) ?? "Europe",
    image: body.image || "https://picsum.photos/seed/travelmark-newdest/1200/900",
    fromPrice: Number(body.fromPrice) || 0,
    blurb: body.blurb ?? "",
    featured: Boolean(body.featured),
  };

  destinations.unshift(newDestination);
  await saveDestinations(destinations);
  return NextResponse.json(newDestination, { status: 201 });
}
