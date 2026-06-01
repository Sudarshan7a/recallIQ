import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { z } from "zod";

const saveCardsSchema = z.object({
  deck_id: z.string().uuid(),
  cards: z.array(
    z.object({
      front: z.string(),
      back: z.string(),
      importance: z.enum(["core", "good_to_know", "optional"]),
      tags: z.array(z.string()),
      sourceText: z.string().nullable().optional(),
    })
  ).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const result = saveCardsSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues
        .map((issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { cards: cardList, deck_id } = result.data;

    const saved = await db
      .insert(cards)
      .values(
        cardList.map((card) => ({
          userId,
          deckId: deck_id,
          front: card.front,
          back: card.back,
          importance: card.importance,
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
