import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";

const resetPasswordSchema = z.object({
  token: z.string().length(6),
  newPassword: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues
        .map((issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { token, newPassword } = result.data;

    // Look up user where resetToken matches AND resetTokenExpires is in the future
    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.resetToken, token),
          gt(users.resetTokenExpires, new Date())
        )
      )
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset code" },
        { status: 400 }
      );
    }

    // Hash the new password with bcrypt
    const hashedPassword = await hashPassword(newPassword);

    // Update user password and clear reset fields
    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      })
      .where(eq(users.id, user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
