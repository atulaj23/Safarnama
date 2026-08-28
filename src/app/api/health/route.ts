import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", service: "Safarnama API", time: new Date().toISOString() });
}
