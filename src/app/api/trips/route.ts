import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { verifyJwt } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

async function getAuthUserId(req: NextRequest): Promise<string | null> {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") ?? "";
  if (!token) return null;
  const payload = await verifyJwt(token);
  return payload?.sub ?? null;
}

export async function GET(req: NextRequest) {
  const userId = await getAuthUserId(req);
  if (!userId) return NextResponse.json({ trips: [] });
  const rows = await db
    .select()
    .from(trips)
    .where(eq(trips.userId, userId))
    .orderBy(desc(trips.createdAt))
    .limit(50);
  return NextResponse.json({ trips: rows });
}

export async function POST(req: NextRequest) {
  const userId = await getAuthUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const [trip] = await db
      .insert(trips)
      .values({
        userId,
        origin: body.origin ?? "",
        destination: body.destination ?? "",
        startDate: body.startDate ?? null,
        days: Number(body.days ?? 3),
        travelers: Number(body.travelers ?? 1),
        budget: Number(body.budget ?? 5000),
        travelMode: body.travelMode ?? "any",
        travelStyle: body.travelStyle ?? "mixed",
        itineraryJson: body.itineraryJson ?? {},
      })
      .returning();
    return NextResponse.json({ trip });
  } catch {
    return NextResponse.json({ error: "Could not save trip" }, { status: 500 });
  }
}
