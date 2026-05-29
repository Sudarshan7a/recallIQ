import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { eq, and } from "drizzle-orm";

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

    const { importance } = await req.json();

    if (!["core", "good_to_know", "optional"].includes(importance)) {
      return NextResponse.json(
        { error: "Invalid importance value" },
        { status: 400 }
      );
    }

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
