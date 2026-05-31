import { DashboardSidebar } from "@/components/ui/DashboardSidebar";
import { DashboardHeader } from "@/components/ui/DashboardHeader";
import { MobileNav } from "@/components/ui/MobileNav";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, cards } from "@/db/schema";
import { eq, and, lte, count } from "drizzle-orm";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side Route Protection
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");
  
  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  const userId = payload.userId;
  const now = new Date();

  // Fetch dynamic user metrics and cards count in parallel
  const [userResult, dueCountResult] = await Promise.all([
    db
      .select({
        name: users.name,
        xp: users.xp,
        streak: users.streak,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1),
    db
      .select({ count: count() })
      .from(cards)
      .where(
        and(
          eq(cards.userId, userId),
          lte(cards.dueDate, now)
        )
      ),
  ]);

  const dbUser = userResult[0];
  const user = {
    name: dbUser?.name ?? "User",
    xp: dbUser?.xp ?? 0,
    streak: dbUser?.streak ?? 0,
  };
  const dueCount = dueCountResult[0]?.count ?? 0;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const level = Math.floor(user.xp / 500) + 1;
  const xpInCurrentLevel = user.xp % 500;

  return (
    <div className="min-h-screen bg-background text-text-primary font-body flex">
      {/* DESKTOP SIDEBAR */}
      <DashboardSidebar dueCount={dueCount} />

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative pb-20 md:pb-0">
        {/* TOP HEADER */}
        <DashboardHeader
          level={level}
          xpInCurrentLevel={xpInCurrentLevel}
          streak={user.streak}
          initials={initials}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <MobileNav dueCount={dueCount} />
    </div>
  );
}
