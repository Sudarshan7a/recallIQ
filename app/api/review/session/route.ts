import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { eq, and, lte, asc, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const deck_id = searchParams.get("deck_id");
    const mode = searchParams.get("mode") ?? "normal";
    const limit = parseInt(searchParams.get("limit") ?? "20");

    const conditions = [
      eq(cards.userId, userId),
      lte(cards.dueDate, new Date()),
    ];

    if (deck_id) {
      conditions.push(eq(cards.deckId, deck_id));
    }

    // Exam mode - only core cards
    if (mode === "exam") {
      conditions.push(eq(cards.importance, "core"));
    }

    const dueCards = await db
      .select()
      .from(cards)
      .where(and(...conditions))
      .orderBy(
        // Core cards first, then by due date
        desc(cards.importance),
        asc(cards.dueDate),
      )
      .limit(limit);

    return NextResponse.json({
      cards: dueCards,
      count: dueCards.length,
      mode,
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
