import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";

export async function POST(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cards: cardList, deck_id } = await req.json();

    if (!cardList || !deck_id || cardList.length === 0) {
      return NextResponse.json(
        { error: "Cards and deck_id are required" },
        { status: 400 }
      );
    }

    const saved = await db
      .insert(cards)
      .values(
        cardList.map((card: { front: string; back: string; importance?: string; tags?: string[]; sourceText?: string | null }) => ({
          userId,
          deckId: deck_id,
          front: card.front,
          back: card.back,
          importance: card.importance ?? "good_to_know",
          tags: card.tags ?? [],
          sourceText: card.sourceText ?? null,
          dueDate: new Date(),
        }))
      )
      .returning();

    return NextResponse.json({
      saved_count: saved.length,
      cards: saved,
    });
  } catch (error) {
    console.error("Save cards error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
