import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, signJwt } from "@/lib/auth";
import { z } from "zod";
import { zodErrorMessage } from "@/lib/zod";

const bodySchema = z.object({
  name: z.string().min(2).max(64),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = bodySchema.parse(await req.json());
    const existing = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
    if (existing.length) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    const passwordHash = await hashPassword(body.password);
    const [user] = await db
      .insert(users)
      .values({ name: body.name, email: body.email, passwordHash })
      .returning();
    const token = await signJwt({ sub: user.id, email: user.email, name: user.name });
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: zodErrorMessage(err) }, { status: 400 });
    }
    return NextResponse.json({ error: "Could not register" }, { status: 500 });
  }
}
