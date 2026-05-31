import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { eq, and, lte, arrayContains } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const deck_id = searchParams.get("deck_id");
    const importance = searchParams.get("importance");
    const tag = searchParams.get("tag");
    const due_today = searchParams.get("due_today");

    const conditions = [eq(cards.userId, userId)];

    if (deck_id) conditions.push(eq(cards.deckId, deck_id));
    if (
      importance === "core" ||
      importance === "good_to_know" ||
      importance === "optional"
    ) {
      conditions.push(eq(cards.importance, importance));
    }
    if (due_today === "true") conditions.push(lte(cards.dueDate, new Date()));
    if (tag) conditions.push(arrayContains(cards.tags, [tag]));

    const result = await db
      .select()
      .from(cards)
      .where(and(...conditions));

    return NextResponse.json({ cards: result, count: result.length });
  } catch (error) {
    console.error("Get cards error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
