import Link from "next/link";
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  Lightbulb,
  Info,
  TrendingDown,
} from "lucide-react";

function getMockCardsDue(): number {
  return 542;
}

export default function DashboardPage() {
  // Simulated backend data. Change this to > 100 to see the Overload State.
  const cardsDue = getMockCardsDue();
  const isEmpty = cardsDue === 0;
  const isOverloaded = cardsDue > 100;

  return (
    <div className="p-6 md:p-10 max-w-[1440px] mx-auto space-y-8">
      {/* HEADER / GREETING */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
            {isEmpty
              ? "Welcome to RecallIQ."
              : isOverloaded
              ? "Welcome back. Let's get you caught up."
              : "Good morning, Sudarshan."}
          </h1>
          <p className="font-body font-normal text-text-secondary mt-1">
            {isEmpty
              ? "You're all caught up before you even started."
              : isOverloaded
              ? "Don't panic. Consistency beats intensity."
              : "You have pending reviews to maintain your mastery."}
          </p>
        </div>
      </div>

      {/* 3-COLUMN DESKTOP COMMAND CENTER GRID */}
      {/* Maps to Global Desktop Rules: Left (280px), Center (~440px), Right (280px) equivalents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================== */}
        {/* CENTER / PRIMARY ACTION COLUMN (Spans 8)   */}
        {/* ========================================== */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {isEmpty ? (
            /* NEW USER EMPTY STATE */
            <div className="bg-card border border-border rounded-large-card p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="absolute -right-12 -top-12 w-56 h-56 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h2 className="font-heading font-bold text-xl mb-1 text-text-primary">
                  Today&apos;s Review
                </h2>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-heading font-bold text-6xl tracking-tighter leading-none text-primary">
                    0
                  </span>
                  <span className="font-label font-semibold text-sm text-text-secondary uppercase tracking-wider">
                    cards due
                  </span>
                </div>
                <p className="font-body font-normal text-text-secondary text-sm mb-6">
                  You&apos;re all caught up before you even started.
                </p>
                <Link
                  href="/add-content"
                  className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary-dark font-label font-bold px-6 py-3 rounded-card transition-colors shadow-sm"
                >
                  Add first card <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : isOverloaded ? (
            /* OVERLOAD STATE (Split Hero + Triage) */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overdue Hero */}
              <div className="md:col-span-2 bg-error text-white rounded-large-card p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 fill-white/20" />
                    <span className="font-label font-bold text-xs uppercase tracking-wider">
                      Overdue Review
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-5xl mb-2">
                    {cardsDue} cards due
                  </h2>
                  <p className="font-body font-normal text-white/90 text-sm mb-6">
                    ~45 minutes total catch-up
                  </p>
                  <div className="flex gap-2 mb-8">
                    <span className="bg-black/20 px-3 py-1 rounded-pill font-label font-semibold text-xs">
                      400 review
                    </span>
                    <span className="bg-white text-error px-3 py-1 rounded-pill font-label font-bold text-xs shadow-sm">
                      142 critical
                    </span>
                  </div>
                </div>
                <Link
                  href="/review"
                  className="relative z-10 bg-white text-error hover:bg-background font-label font-bold text-sm px-6 py-3 rounded-card transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                >
                  Start Catch-up <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Escape Hatch / Triage Card */}
              <div className="md:col-span-1 bg-error-light text-error-dark rounded-large-card p-6 border border-error/20 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center mb-4 text-error">
                    <Shield className="w-5 h-5 fill-error/20" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">
                    Overwhelmed?
                  </h3>
                  <p className="font-body font-normal text-sm opacity-90 mb-6">
                    Just do 20 critical cards today to break the ice.
                  </p>
                </div>
                <Link
                  href="/review"
                  className="bg-error hover:bg-error-dark text-white font-label font-bold text-sm px-4 py-3 rounded-card transition-colors active:scale-95 shadow-sm flex items-center justify-center"
                >
                  Triage 20
                </Link>
              </div>
            </div>
          ) : (
            /* STANDARD HERO STATE */
            <div className="bg-primary text-white rounded-large-card p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h2 className="font-heading font-bold text-xl mb-1">
                  Up Next for Review
                </h2>
                <p className="font-body font-normal text-primary-light/80 text-sm mb-6">
                  Optimized by spaced repetition
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-heading font-bold text-6xl tracking-tighter leading-none">
                    {cardsDue}
                  </span>
                  <span className="font-label font-semibold text-sm text-primary-light uppercase tracking-wider">
                    Cards Due
                  </span>
                </div>
                <Link
                  href="/review"
                  className="bg-white text-primary hover:bg-background font-label font-bold px-6 py-3 rounded-card transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Start Session <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {!isEmpty && (
            /* Severely Decayed Decks */
            <div className="mt-2">
              <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
                Severely Decayed Decks
              </h3>
              <div className="flex flex-col gap-4">
                {/* Decay Card 1 */}
                <div className="bg-card rounded-large-card border border-border border-l-4 border-l-error p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-base text-text-primary mb-1">
                      AWS Certified Solutions Architect
                    </h4>
                    <div className="flex items-center gap-4">
                      <span className="font-body font-normal text-xs text-text-secondary">
                        Last reviewed 3 weeks ago
                      </span>
                      <span className="text-error font-label font-bold text-[10px] flex items-center gap-1 bg-error-light px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        <TrendingDown className="w-3 h-3" /> 104 overdue
                      </span>
                    </div>
                  </div>
                  <div className="w-full sm:w-32">
                    <div className="flex justify-between mb-1">
                      <span className="font-label font-semibold text-[10px] text-text-secondary uppercase">
                        Mastery
                      </span>
                      <span className="font-label font-bold text-[10px] text-error">
                        14%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-pill overflow-hidden">
                      <div
                        className="h-full bg-error rounded-pill"
                        style={{ width: "14%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* RIGHT / INSIGHTS COLUMN (Spans 4)          */}
        {/* ========================================== */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {isEmpty ? (
            /* Empty-State Insight Banner */
            <div className="bg-primary-light/40 text-primary-dark rounded-large-card p-6 shadow-sm flex items-start gap-3 border border-primary/15">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="font-body font-normal text-sm leading-relaxed">
                <strong>Welcome to RecallIQ.</strong> Every expert was once a
                beginner. Start by adding a few fundamental concepts to your
                first deck.
              </p>
            </div>
          ) : (
            <>
              {/* Daily Insight */}
              <div className="bg-primary-light/50 text-primary-dark rounded-large-card p-6 shadow-sm flex items-start gap-3 border border-primary/10">
                <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm mb-1">
                    Don&apos;t panic...
                  </h4>
                  <p className="font-body font-normal text-xs opacity-90 leading-relaxed">
                    Consistency beats intensity. Taking a break is normal. Use
                    the Triage feature to rebuild your habit slowly without
                    burning out.
                  </p>
                </div>
              </div>

              {/* Activity Heatmap */}
              <div className="bg-card border border-border rounded-large-card p-6 shadow-sm">
                <h4 className="font-heading font-bold text-sm text-text-primary mb-4">
                  Recent Activity
                </h4>
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                  {Array.from({ length: 28 }).map((_, i) => {
                    // Simulate the gap logic from the spec
                    const isMissed = i >= 21 && i <= 26;
                    const isToday = i === 27;
                    const bgClass = isMissed
                      ? "bg-border/50"
                      : isToday
                        ? "bg-background border border-primary"
                        : "bg-secondary/70";

                    return (
                      <div
                        key={i}
                        className={`w-full aspect-square rounded-sm ${bgClass}`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between font-label font-semibold text-[10px] text-text-secondary mt-2">
                  <span>4 wks ago</span>
                  <span>Today</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
