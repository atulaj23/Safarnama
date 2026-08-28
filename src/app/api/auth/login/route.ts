import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { comparePassword, signJwt } from "@/lib/auth";
import { z } from "zod";
import { zodErrorMessage } from "@/lib/zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = bodySchema.parse(await req.json());
    const [user] = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const ok = await comparePassword(body.password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const token = await signJwt({ sub: user.id, email: user.email, name: user.name });
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: zodErrorMessage(err) }, { status: 400 });
    }
    return NextResponse.json({ error: "Could not login" }, { status: 500 });
  }
}
