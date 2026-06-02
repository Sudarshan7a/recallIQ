import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";

const verifyEmailSchema = z.object({
  email: z.string().email(),
  token: z.string().length(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const result = verifyEmailSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues
        .map((issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { email, token } = result.data;

    // Look up user where email and verificationToken matches, and expires is in the future
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.email, email),
          eq(users.verificationToken, token),
          gt(users.verificationTokenExpires, new Date())
        )
      )
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    // Mark email as verified and clear token fields
    await db
      .update(users)
      .set({
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpires: null,
      })
      .where(eq(users.id, user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
