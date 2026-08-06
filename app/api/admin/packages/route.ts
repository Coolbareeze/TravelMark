import { NextRequest, NextResponse } from "next/server";
import { getPackages, savePackages } from "@/lib/data";
import { slugify } from "@/lib/utils";
import type { HolidayPackage } from "@/types";

export async function GET() {
  const packages = await getPackages();
  return NextResponse.json(packages);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<HolidayPackage>;
  const packages = await getPackages();

  const newPackage: HolidayPackage = {
    id: `p${Date.now()}`,
    slug: body.slug?.trim() || slugify(body.title ?? "new-package"),
    title: body.title ?? "Untitled Package",
    destination: body.destination ?? "",
    category: (body.category as HolidayPackage["category"]) ?? "holiday-packages",
    image: body.image || "https://picsum.photos/seed/travelmark-new/1200/900",
    price: Number(body.price) || 0,
    originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
    duration: body.duration ?? "",
    airline: body.airline ?? "",
    hotelRating: Number(body.hotelRating) || 4,
    hotelName: body.hotelName ?? "",
    transfersIncluded: Boolean(body.transfersIncluded),
    boardBasis: body.boardBasis ?? "Bed & Breakfast",
    highlights: body.highlights ?? [],
    description: body.description ?? "",
    featured: Boolean(body.featured),
    offerEndsAt: body.offerEndsAt || undefined,
  };

  packages.unshift(newPackage);
  await savePackages(packages);
  return NextResponse.json(newPackage, { status: 201 });
}
