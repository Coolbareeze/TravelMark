import { NextRequest, NextResponse } from "next/server";
import { getPackages, savePackages } from "@/lib/data";
import type { HolidayPackage } from "@/types";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const packages = await getPackages();
  const pkg = packages.find((p) => p.id === params.id);
  if (!pkg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(pkg);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = (await req.json()) as Partial<HolidayPackage>;
  const packages = await getPackages();
  const index = packages.findIndex((p) => p.id === params.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  packages[index] = {
    ...packages[index],
    ...body,
    price: body.price !== undefined ? Number(body.price) : packages[index].price,
    originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
    hotelRating: body.hotelRating !== undefined ? Number(body.hotelRating) : packages[index].hotelRating,
    transfersIncluded: Boolean(body.transfersIncluded),
    featured: Boolean(body.featured),
  } as HolidayPackage;

  await savePackages(packages);
  return NextResponse.json(packages[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const packages = await getPackages();
  const filtered = packages.filter((p) => p.id !== params.id);
  if (filtered.length === packages.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await savePackages(filtered);
  return NextResponse.json({ ok: true });
}
