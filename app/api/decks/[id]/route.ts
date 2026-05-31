import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { decks, cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { eq, and } from "drizzle-orm";

// GET single deck with its cards
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [deck] = await db
      .select()
      .from(decks)
      .where(and(eq(decks.id, id), eq(decks.userId, userId)))
      .limit(1);

    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    const deckCards = await db
      .select()
      .from(cards)
      .where(and(eq(cards.deckId, id), eq(cards.userId, userId)));

    return NextResponse.json({ deck, cards: deckCards });
  } catch (error) {
    console.error("Get deck error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH update deck
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

    const { name, description, domain } = await req.json();

    const [deck] = await db
      .update(decks)
      .set({
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(domain !== undefined && { domain }),
      })
      .where(and(eq(decks.id, id), eq(decks.userId, userId)))
      .returning();

    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    return NextResponse.json({ deck });
  } catch (error) {
    console.error("Update deck error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE deck
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db
      .delete(decks)
      .where(and(eq(decks.id, id), eq(decks.userId, userId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete deck error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
