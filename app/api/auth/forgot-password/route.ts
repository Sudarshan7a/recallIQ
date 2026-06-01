import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import crypto from "crypto";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues
        .map((issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { email } = result.data;

    // Look up user by email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user) {
      // Generate secure 6-digit OTP
      const otp = crypto.randomInt(100000, 1000000).toString();
      const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

      // Store OTP and expiry
      await db
        .update(users)
        .set({
          resetToken: otp,
          resetTokenExpires: expires,
        })
        .where(eq(users.id, user.id));

      // For testing without email
      console.log(`[PASSWORD RESET OTP FOR ${email}]: ${otp}`);
      
      // TODO: Wire Resend email sending here
    }

    return NextResponse.json({
      message: "If an account exists with that email, you will receive a reset code",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
