import { NextResponse } from "next/server";
import { destinations } from "@/lib/destinations";

export async function GET() {
  return NextResponse.json({ destinations });
}
