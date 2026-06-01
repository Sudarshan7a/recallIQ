import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const updateImportanceSchema = z.object({
  importance: z.enum(["core", "good_to_know", "optional"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const result = updateImportanceSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues
        .map((issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { importance } = result.data;

    const [card] = await db
      .update(cards)
      .set({ importance })
      .where(and(eq(cards.id, id), eq(cards.userId, userId)))
      .returning();

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json({ card });
  } catch (error) {
    console.error("Update importance error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
