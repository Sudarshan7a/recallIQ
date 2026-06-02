import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { decks, cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { eq, and, or, ilike } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (q === null) {
      return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
    }

    if (q.trim().length < 2) {
      return NextResponse.json({ decks: [], cards: [] });
    }

    const queryStr = `%${q.trim()}%`;

    // Search decks
    const matchingDecks = await db
      .select({
        id: decks.id,
        name: decks.name,
        description: decks.description,
        domain: decks.domain,
      })
      .from(decks)
      .where(
        and(
          eq(decks.userId, userId),
          or(
            ilike(decks.name, queryStr),
            ilike(decks.description, queryStr)
          )
        )
      )
      .limit(5);

    // Search cards (joined with decks to get deckName)
    const matchingCards = await db
      .select({
        id: cards.id,
        front: cards.front,
        back: cards.back,
        importance: cards.importance,
        deck_id: cards.deckId,
        deckName: decks.name,
      })
      .from(cards)
      .innerJoin(decks, eq(cards.deckId, decks.id))
      .where(
        and(
          eq(cards.userId, userId),
          or(
            ilike(cards.front, queryStr),
            ilike(cards.back, queryStr)
          )
        )
      )
      .limit(10);

    return NextResponse.json({
      decks: matchingDecks,
      cards: matchingCards,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
