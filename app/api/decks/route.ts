import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { decks, cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { eq, and, count, sql } from "drizzle-orm";

// GET all decks for current user
export async function GET(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userDecks = await db
      .select({
        id: decks.id,
        name: decks.name,
        description: decks.description,
        domain: decks.domain,
        createdAt: decks.createdAt,
        cardCount: count(cards.id),
        dueCount: sql<number>`count(${cards.id}) filter (where ${cards.dueDate} <= now())`,
      })
      .from(decks)
      .leftJoin(cards, and(eq(cards.deckId, decks.id), eq(cards.userId, userId)))
      .where(eq(decks.userId, userId))
      .groupBy(decks.id);

    return NextResponse.json({ decks: userDecks });
  } catch (error) {
    console.error("Get decks error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create a new deck
export async function POST(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, domain } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Deck name is required" },
        { status: 400 }
      );
    }

    const [deck] = await db
      .insert(decks)
      .values({
        userId,
        name,
        description,
        domain,
      })
      .returning();

    return NextResponse.json({ deck }, { status: 201 });
  } catch (error) {
    console.error("Create deck error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
