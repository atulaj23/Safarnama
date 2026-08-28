import { NextRequest, NextResponse } from "next/server";
import { travelChat, type ItineraryOutput } from "@/lib/ai";
import { z } from "zod";
import { zodErrorMessage } from "@/lib/zod";

const bodySchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
  context: z.any().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = bodySchema.parse(await req.json());
    const reply = await travelChat(body.history, body.context as ItineraryOutput | undefined);
    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: zodErrorMessage(err) }, { status: 400 });
    }
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
