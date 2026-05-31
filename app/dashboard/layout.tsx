// Inside your Header actions area:
import { StreakBadge } from "@/components/ui/StreakBadge";
import { XPBar } from "@/components/ui/XPBar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  Home,
  Layers,
  BarChart2,
  User,
  Settings,
  PlusCircle,
  Flame,
  Bell,
} from "lucide-react";

// Replace with your actual auth verifier
// import { verifyToken } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side Route Protection
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  // if (!token || !verifyToken(token)) redirect('/login');

  return (
    <div className="min-h-screen bg-background text-text-primary font-body flex">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 border-r border-border bg-card py-8 z-40">
        <div className="px-6 mb-10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-input bg-primary flex items-center justify-center text-white">
              <span className="font-heading font-bold">S</span>
            </div>
            <span className="font-heading font-bold text-xl text-primary tracking-tight">
              RecallIQ
            </span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-primary-light text-primary font-label font-semibold text-sm rounded-card border-l-4 border-primary"
          >
            <Home className="w-5 h-5" /> Dashboard
          </Link>
          <Link
            href="/dashboard/decks"
            className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-background hover:text-text-primary font-label font-semibold text-sm rounded-card transition-colors"
          >
            <Layers className="w-5 h-5" /> Decks
          </Link>
          <Link
            href="/dashboard/stats"
            className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:bg-background hover:text-text-primary font-label font-semibold text-sm rounded-card transition-colors"
          >
            <BarChart2 className="w-5 h-5" /> Stats
          </Link>
        </nav>

        <div className="px-6 mt-auto">
          <button className="w-full bg-primary hover:bg-primary-dark text-white font-label font-semibold text-sm py-3 rounded-card transition-colors flex items-center justify-center gap-2 shadow-sm">
            <PlusCircle className="w-4 h-4" /> New Session
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative pb-20 md:pb-0">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6">
          <div className="md:hidden font-heading font-bold text-xl text-primary">
            RecallIQ
          </div>
          <div className="hidden md:block" /> {/* Spacer */}
          <div className="flex items-center gap-4">
            {/* Streak & XP */}
            <div className="hidden sm:flex items-center gap-6">
              {/* XP Bar (Using showLabels={false} to keep it inline for the header) */}
              <div className="flex items-center gap-3 w-40">
                <span className="font-label font-semibold text-[10px] text-text-secondary whitespace-nowrap">
                  420 / 500 XP
                </span>
                <XPBar
                  currentXP={420}
                  targetXP={500}
                  size="standard"
                  showLabels={false}
                />
              </div>

              {/* Streak Badge */}
              <StreakBadge days={12} state="active" size="sm" />
            </div>

            {/* Actions */}
            <button className="text-text-secondary hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-text-secondary font-label font-semibold text-xs cursor-pointer shadow-sm">
              JD
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 flex items-center justify-around px-2 z-40 pb-safe">
        <Link
          href="/dashboard"
          className="flex flex-col items-center gap-1 text-primary"
        >
          <Home className="w-6 h-6 fill-primary/20" />
          <span className="font-label font-semibold text-[10px]">Home</span>
        </Link>
        <Link
          href="/dashboard/review"
          className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-colors relative"
        >
          <Layers className="w-6 h-6" />
          <span className="font-label font-semibold text-[10px]">Review</span>
          <span className="absolute -top-1 -right-2 bg-error text-white text-[9px] font-bold px-1.5 rounded-pill border-2 border-card">
            14
          </span>
        </Link>
        <Link
          href="/dashboard/stats"
          className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-colors"
        >
          <BarChart2 className="w-6 h-6" />
          <span className="font-label font-semibold text-[10px]">Stats</span>
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-colors"
        >
          <User className="w-6 h-6" />
          <span className="font-label font-semibold text-[10px]">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
