import { NextRequest, NextResponse } from "next/server";
import { generateItinerary, type ItineraryOutput, type TravelPlanInput } from "@/lib/ai";
import { z } from "zod";
import { zodErrorMessage } from "@/lib/zod";

const inputSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  startDate: z.string().optional(),
  days: z.number().int().min(1).max(30),
  travelers: z.number().int().min(1).max(20),
  budget: z.number().int().min(500).max(1000000),
  travelMode: z.enum(["train", "flight", "bus", "car", "any"]),
  travelStyle: z.enum(["adventure", "relaxed", "culture", "nature", "food", "mixed"]),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = inputSchema.parse(await req.json());
    const result: ItineraryOutput = await generateItinerary(parsed as TravelPlanInput);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: zodErrorMessage(err) }, { status: 400 });
    }
    return NextResponse.json({ error: "Could not generate itinerary" }, { status: 500 });
  }
}
