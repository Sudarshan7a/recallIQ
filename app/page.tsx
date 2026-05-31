import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Star,
  Plus,
  Flame,
  Award,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary font-body relative overflow-x-hidden selection:bg-primary-light selection:text-primary-dark">
      {/* Decorative Dot Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #E5E5E2 2px, transparent 2px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-input flex items-center justify-center text-white font-heading font-bold text-lg">
              S
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">
              Recall<span className="text-primary">IQ</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-text-secondary hover:text-text-primary font-label font-semibold text-sm transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-pill font-label font-semibold text-sm transition-colors shadow-sm shadow-primary/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Landing Area */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center relative z-10 animate-page-in">
        {/* Semantic Action Announcement Pill */}
        <div className="inline-flex items-center gap-2 bg-primary-light text-primary border border-primary/20 rounded-pill px-4 py-1.5 mb-8 font-label font-semibold text-xs transition-transform hover:scale-[1.02]">
          <Sparkles className="w-4 h-4 fill-primary/15" />
          <span>AI-powered spaced repetition, now free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>

        {/* Hero Headings */}
        <h1 className="font-heading font-bold text-5xl sm:text-7xl tracking-tight text-text-primary max-w-4xl mb-2 leading-[1.05]">
          Stop forgetting what you learn.
        </h1>
        <p className="font-heading font-medium text-3xl sm:text-5xl text-primary italic mb-6">
          RecallIQ remembers for you.
        </p>

        {/* Short Informative Copy */}
        <p className="font-body font-normal text-text-secondary text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
          Type what you learned. AI generates flashcards. The algorithm shows
          them back at exactly the right moment, right before you forget.
        </p>

        {/* Clean Call To Action Containers */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-label font-semibold px-8 py-4 rounded-card transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-primary/10"
          >
            Start learning for free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="w-full sm:w-auto text-text-primary bg-card border border-border hover:bg-background font-label font-semibold px-8 py-4 rounded-card transition-colors">
            See how it works
          </button>
        </div>

        {/* Social Validation Group */}
        <div className="flex items-center gap-3 mb-20">
          <div className="flex -space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-primary text-white font-label font-semibold text-xs flex items-center justify-center border-2 border-card shadow-sm">
              JD
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary text-white font-label font-semibold text-xs flex items-center justify-center border-2 border-card shadow-sm">
              AM
            </div>
            <div className="w-8 h-8 rounded-full bg-tertiary text-white font-label font-semibold text-xs flex items-center justify-center border-2 border-card shadow-sm">
              RL
            </div>
            <div className="w-8 h-8 rounded-full bg-error text-white font-label font-semibold text-xs flex items-center justify-center border-2 border-card shadow-sm">
              SK
            </div>
            <div className="w-8 h-8 rounded-full bg-border text-text-secondary font-label font-semibold text-xs flex items-center justify-center border-2 border-card shadow-sm">
              <Plus className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="font-label font-semibold text-xs text-text-secondary">
              Joined by 2,400+ students
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-label font-semibold text-xs text-text-primary">
                4.9 rating
              </span>
            </div>
          </div>
        </div>

        {/* Interactive App Concept Preview Grid (Matches Layout Image perfectly) */}
        <div className="w-full max-w-4xl aspect-[16/10] bg-card rounded-large-card shadow-xl border border-border overflow-hidden flex text-left relative">
          {/* Deck Sidebar Panel */}
          <aside className="w-60 border-r border-border p-5 flex flex-col gap-6 bg-surface/50">
            {/* Streak Counter Segment */}
            <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-card">
              <Flame className="w-5 h-5 text-tertiary fill-tertiary" />
              <div className="flex flex-col flex-1">
                <span className="font-heading font-bold text-xs text-text-primary">
                  12 Day Streak
                </span>
                <div className="w-full h-1.5 bg-border rounded-pill mt-1 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-pill"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
            </div>

            {/* Deck Lists with Brand Spaced Indicators */}
            <nav className="flex flex-col gap-2">
              <div className="p-3 rounded-card border-l-4 border-error bg-error-light/40 flex justify-between items-center">
                <span className="font-body font-normal text-sm text-text-primary">
                  Biology 101
                </span>
                <span className="font-label font-semibold text-xs text-error-dark">
                  24 due
                </span>
              </div>
              <div className="p-3 rounded-card border-l-4 border-tertiary bg-tertiary-light/40 flex justify-between items-center">
                <span className="font-body font-normal text-sm text-text-primary">
                  World History
                </span>
                <span className="font-label font-semibold text-xs text-tertiary-dark">
                  12 due
                </span>
              </div>
              <div className="p-3 rounded-card border-l-4 border-secondary bg-secondary-light/40 flex justify-between items-center">
                <span className="font-body font-normal text-sm text-text-primary">
                  Spanish Vocab
                </span>
                <span className="font-label font-semibold text-xs text-secondary-dark">
                  0 due
                </span>
              </div>
            </nav>
          </aside>

          {/* Flashcard Arena Viewport */}
          <main className="flex-1 p-10 flex flex-col items-center justify-center relative bg-background/30">
            {/* Core Display Card */}
            <div className="w-full max-w-md bg-card border border-border rounded-large-card p-8 shadow-md text-center flex flex-col items-center gap-6">
              <div className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
                Biology 101 / Card 4 of 24
              </div>
              <h3 className="font-heading font-bold text-xl text-text-primary leading-snug">
                What is the primary function of the Mitochondria?
              </h3>
              <button className="w-full py-3 px-4 bg-background hover:bg-card border border-border rounded-input font-label font-semibold text-sm text-text-primary transition-colors mt-2">
                Show Answer
              </button>
            </div>

            {/* Real-time Event Badges (Absolute floating markers) */}
            <div className="absolute top-8 right-8 bg-card px-4 py-3 rounded-card shadow-lg border border-border flex items-center gap-3 animate-bounce">
              <div className="bg-secondary-light p-2 rounded-pill text-secondary">
                <Award className="w-4 h-4 fill-secondary/15" />
              </div>
              <div>
                <p className="font-label font-semibold text-xs text-text-primary">
                  +50 XP
                </p>
                <p className="font-body font-normal text-[10px] text-text-secondary">
                  Level 12 reached!
                </p>
              </div>
            </div>

            <div className="absolute left-4 top-1/4 bg-card px-4 py-2.5 rounded-card shadow-md border border-border flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary fill-primary/10" />
              <span className="font-label font-semibold text-xs text-text-primary">
                AI Deck Generated
              </span>
            </div>

            <div className="absolute right-2 bottom-1/4 bg-card px-4 py-2.5 rounded-card shadow-md border border-border flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span className="font-label font-semibold text-xs text-text-primary">
                Mastered: Mitosis
              </span>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}
