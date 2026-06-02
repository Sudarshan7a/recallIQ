// TODO: Replace console.log with Resend email sending for verification
// See: https://resend.com/docs/send-with-nextjs
// Wire when RESEND_API_KEY is available in .env.local

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { hashPassword, generateToken } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";
import crypto from "crypto";
import { registerLimiter, limitRequest } from "@/lib/ratelimit";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? 
               req.headers.get("x-real-ip") ?? 
               "127.0.0.1";

    const { success, limit, remaining, reset } = await limitRequest(
      registerLimiter,
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

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues
        .map((issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, password } = result.data;

    // Check if user already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    // Generates a secure 6-digit OTP using crypto.randomInt(100000, 999999)
    const otp = crypto.randomInt(100000, 999999).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Hash password and create user
    const hashedPassword = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        verificationToken: otp,
        verificationTokenExpires: expires,
        emailVerified: false,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      });

    // console.log prints the OTP clearly so it is visible in terminal
    console.log(`[RecallIQ] New user verification OTP for ${email}: ${otp}`);

    const token = generateToken(user.id);

    const response = NextResponse.json({ user, token }, { status: 201 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
