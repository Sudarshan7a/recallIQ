import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cards, revlog, users } from "@/db/schema";
import { getUserFromRequest } from "@/lib/middleware";
import { eq, and, lte, gte, sql, count } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const [todayReviews] = await db
      .select({ count: count() })
      .from(revlog)
      .where(
        and(
          eq(revlog.userId, userId),
          gte(revlog.reviewTime, startOfDay)
        )
      );

    const [totalCards] = await db
      .select({ count: count() })
      .from(cards)
      .where(eq(cards.userId, userId));

    const [dueToday] = await db
      .select({ count: count() })
      .from(cards)
      .where(
        and(
          eq(cards.userId, userId),
          lte(cards.dueDate, now)
        )
      );

    const weekReviews = await db
      .select({ rating: revlog.rating })
      .from(revlog)
      .where(
        and(
          eq(revlog.userId, userId),
          gte(revlog.reviewTime, startOfWeek)
        )
      );

    const totalWeekReviews = weekReviews.length;
    const correctWeekReviews = weekReviews.filter((r) => r.rating >= 3).length;
    const accuracyRate =
      totalWeekReviews > 0
        ? Math.round((correctWeekReviews / totalWeekReviews) * 100)
        : 0;

    const weakSpots = await db
      .select({
        deckId: cards.deckId,
        lapses: sql<number>`sum(${cards.lapses})`.as("lapses"),
        count: count(),
      })
      .from(cards)
      .where(eq(cards.userId, userId))
      .groupBy(cards.deckId)
      .orderBy(sql`sum(${cards.lapses}) desc`)
      .limit(5);

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const heatmapData = await db
      .select({
        date: sql<string>`DATE(${revlog.reviewTime})`.as("date"),
        count: count(),
      })
      .from(revlog)
      .where(
        and(
          eq(revlog.userId, userId),
          gte(revlog.reviewTime, thirtyDaysAgo)
        )
      )
      .groupBy(sql`DATE(${revlog.reviewTime})`);

    return NextResponse.json({
      streak: user?.streak ?? 0,
      xp: user?.xp ?? 0,
      cards_reviewed_today: todayReviews.count,
      total_cards: totalCards.count,
      due_today: dueToday.count,
      accuracy_rate: accuracyRate,
      weak_spots: weakSpots,
      heatmap: heatmapData,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}