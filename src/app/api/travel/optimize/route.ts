import { NextRequest, NextResponse } from "next/server";
import { generateItinerary, type TravelPlanInput } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TravelPlanInput & { mode: "cheaper" | "faster" | "more" };
    const result = await generateItinerary(body, body.mode ?? "plan");
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Optimization failed" }, { status: 500 });
  }
}
