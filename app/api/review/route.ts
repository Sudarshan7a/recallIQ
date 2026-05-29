import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards, revlog, users } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { scheduleReview, Rating, State } from "@/lib/fsrs";
import { eq, and, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { card_id, rating } = await req.json();

    if (!card_id || rating === undefined) {
      return NextResponse.json(
        { error: "card_id and rating are required" },
        { status: 400 },
      );
    }
    // Get the user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the card
    const [card] = await db
      .select()
      .from(cards)
      .where(and(eq(cards.id, card_id), eq(cards.userId, userId)))
      .limit(1);

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    // Build FSRS card state
    const fsrsCard = {
      due: card.dueDate ?? new Date(),
      stability: card.stability ?? 0,
      difficulty: card.difficulty ?? 0,
      elapsed_days: 0,
      scheduled_days: 0,
      reps: card.reps ?? 0,
      lapses: card.lapses ?? 0,
      state: (card.state as unknown as State) ?? State.New,
      last_review: card.lastReviewedAt ?? undefined,
    };

    // Calculate new schedule
    const result = scheduleReview(fsrsCard, rating as Rating);

    // Calculate XP based on rating
    const xpMap: Record<number, number> = { 1: 5, 2: 8, 3: 10, 4: 15 };
    const xpEarned = xpMap[rating] ?? 10;

    // Update card with new FSRS state
    const [updatedCard] = await db
      .update(cards)
      .set({
        dueDate: result.due,
        stability: result.stability,
        difficulty: result.difficulty,
        reps: result.reps,
        lapses: result.lapses,
        state: (() => {
          const stateMap: Record<
            number,
            "new" | "learning" | "review" | "suspended"
          > = {
            0: "new",
            1: "learning",
            2: "review",
            3: "suspended",
          };
          return stateMap[result.state as unknown as number] ?? "learning";
        })(),
        lastReviewedAt: new Date(),
      })
      .where(eq(cards.id, card_id))
      .returning();

    // Insert review log
    await db.insert(revlog).values({
      cardId: card_id,
      userId,
      rating,
      elapsedDays: result.elapsed_days,
      scheduledDays: result.scheduled_days,
      reviewTime: new Date(),
    });

    // Calculate streak
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let newStreak = user.streak ?? 0;

    if (user.lastStudiedAt) {
      const lastStudied = new Date(user.lastStudiedAt);
      const lastStudiedDay = new Date(lastStudied);
      lastStudiedDay.setHours(0, 0, 0, 0);

      if (lastStudiedDay.getTime() === yesterday.getTime()) {
        // Studied yesterday — increment streak
        newStreak = newStreak + 1;
      } else if (lastStudiedDay.getTime() === today.getTime()) {
        // Already studied today — keep streak
        newStreak = newStreak;
      } else {
        // Missed a day — reset streak
        newStreak = 1;
      }
    } else {
      // First time ever studying
      newStreak = 1;
    }

    // Award XP and update streak
    await db
      .update(users)
      .set({
        xp: sql`${users.xp} + ${xpEarned}`,
        streak: newStreak,
        lastStudiedAt: now,
      })
      .where(eq(users.id, userId));

    return NextResponse.json({
      updated_card: updatedCard,
      xp_earned: xpEarned,
      next_due: result.due,
      streak: newStreak,
    });
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
