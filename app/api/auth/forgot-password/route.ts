// TODO: Replace console.log with Resend email sending
// See: https://resend.com/docs/send-with-nextjs
// Wire when RESEND_API_KEY is available in .env.local

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import crypto from "crypto";
import { forgotPasswordLimiter, limitRequest } from "@/lib/ratelimit";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? 
               req.headers.get("x-real-ip") ?? 
               "127.0.0.1";

    const { success, limit, remaining, reset } = await limitRequest(
      forgotPasswordLimiter,
      ip
    );
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

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
      // Generates a secure 6-digit OTP using crypto.randomInt(100000, 999999)
      const otp = crypto.randomInt(100000, 999999).toString();
      const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

      // Store OTP and expiry
      await db
        .update(users)
        .set({
          resetToken: otp,
          resetTokenExpires: expires,
        })
        .where(eq(users.id, user.id));

      // console.log prints the OTP clearly so it is visible in terminal
      console.log(`[RecallIQ] Password reset OTP for ${email}: ${otp}`);
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
