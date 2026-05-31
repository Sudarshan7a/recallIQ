"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Clock,
  Folder,
  Eye,
  Touchpad,
  Flag,
  Tag,
  Edit3,
  Ban,
  Check,
  Flame,
  AlertCircle,
  Share,
  Home,
  RotateCw,
  Settings,
} from "lucide-react";
import { XPBar } from "@/components/ui/XPBar";

export default function ReviewSessionPage() {
  const router = useRouter();

  // State Machine
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionState, setSessionState] = useState<
    "active" | "paused" | "options" | "celebration" | "summary"
  >("active");
  const [showXP, setShowXP] = useState(false);

  // Simulated Session Data
  const [currentCardIndex, setCurrentCardIndex] = useState(14); // Set to 14 to test the last card state
  const totalCards = 14;
  const progressPercent = (currentCardIndex / totalCards) * 100;

  // Handlers
  const handleShowAnswer = () => setIsFlipped(true);

  const handleRating = () => {
    setShowXP(true);

    // If last card, trigger the multi-phase celebration sequence
    if (currentCardIndex >= totalCards) {
      setTimeout(() => {
        setShowXP(false);
        setSessionState("celebration"); // Phase B: Card slides out, bar turns teal

        setTimeout(() => {
          setSessionState("summary"); // Phase C: Summary mounts
        }, 600); // 600ms allows the card slide-out animation to finish
      }, 200); // 200ms delay after tap
    } else {
      setTimeout(() => {
        setShowXP(false);
        setIsFlipped(false);
        setCurrentCardIndex((prev) => prev + 1);
      }, 800);
    }
  };

  const handleClose = () => setSessionState("paused");
  const handleLongPress = () => setSessionState("options");

  // ============================================================================
  // VIEW: PHASE C - SESSION COMPLETE SUMMARY
  // ============================================================================
  if (sessionState === "summary") {
    return (
      <div className="bg-background min-h-screen text-text-primary font-body antialiased flex flex-col items-center py-12 px-6 relative overflow-hidden">
        {/* CSS Confetti Overlay (Implementation in globals.css) */}
        <div
          className="absolute inset-0 pointer-events-none confetti-overlay z-0"
          aria-hidden="true"
        />

        <header className="w-full max-w-2xl flex justify-between items-center mb-8 relative z-10">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 rounded-full hover:bg-card transition-colors text-text-secondary"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-heading font-bold text-xl text-primary">
            Study Session
          </h1>
          <div className="w-10" />
        </header>

        <main className="w-full max-w-md flex flex-col items-center relative z-10 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4 shadow-sm animate-in zoom-in-50 duration-500 delay-150">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <h2 className="font-heading font-bold text-4xl text-text-primary mb-2 leading-tight">
              Session complete!
            </h2>
            <p className="font-body font-normal text-lg text-text-secondary">
              Your memory just got stronger.
            </p>
          </div>

          <div className="bg-primary-light/50 border border-primary/20 rounded-pill px-6 py-2 flex items-center gap-2 mb-8 shadow-sm">
            <Flame className="w-5 h-5 text-primary fill-primary" />
            <span className="font-label font-bold text-sm text-primary">
              12 day streak maintained!
            </span>
          </div>

          <div className="bg-card border border-border rounded-large-card w-full p-6 shadow-sm mb-6">
            <div className="grid grid-cols-2 gap-y-6 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-border/50 -translate-y-1/2" />

              <div className="flex flex-col items-center pr-4 pb-4">
                <span className="font-heading font-bold text-2xl text-text-primary">
                  14
                </span>
                <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider mt-1">
                  Cards reviewed
                </span>
              </div>
              <div className="flex flex-col items-center pl-4 pb-4">
                <span className="font-heading font-bold text-2xl text-secondary">
                  11
                </span>
                <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider text-center mt-1">
                  Correct first try
                </span>
              </div>
              <div className="flex flex-col items-center pr-4 pt-4">
                <span className="font-heading font-bold text-2xl text-primary">
                  +140
                </span>
                <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider mt-1">
                  XP Earned
                </span>
              </div>
              <div className="flex flex-col items-center pl-4 pt-4">
                <span className="font-heading font-bold text-2xl text-text-primary">
                  8m
                </span>
                <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider mt-1">
                  Time spent
                </span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border/50">
              <XPBar
                currentXP={420}
                targetXP={500}
                size="standard"
                state="normal"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 mb-8">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full h-12 bg-primary text-white rounded-card font-label font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <Home className="w-4 h-4 mr-2" /> Return to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ============================================================================
  // VIEW: STANDARD REVIEW ARENA (Desktop 3-Column & Mobile View)
  // ============================================================================
  return (
    <div className="bg-background min-h-screen text-text-primary font-body antialiased flex flex-col items-center select-none overflow-hidden">
      {/* 1. TOP HEADER & DYNAMIC PROGRESS BAR */}
      <header className="sticky top-0 bg-background/90 backdrop-blur-sm flex justify-between items-center w-full max-w-6xl mx-auto px-4 lg:px-8 h-16 pt-2 md:pt-4 z-40 border-b border-border/50">
        <div className="flex items-center gap-4">
          <button
            onClick={handleClose}
            className="p-2 -ml-2 rounded-full hover:bg-card transition-colors text-text-secondary"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="hidden lg:block font-label font-semibold text-sm text-text-secondary">
            Exit Session
          </span>
        </div>

        {/* Desktop Centered Progress Bar */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-8">
          <div className="w-full h-2 bg-border/50 rounded-pill relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-pill transition-all duration-500 ease-out ${sessionState === "celebration" ? "bg-secondary shadow-[0_0_8px_rgba(29,158,117,0.6)]" : "bg-primary"}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Mobile Title */}
        <div className="lg:hidden font-heading font-bold text-lg tabular-nums text-text-primary">
          {currentCardIndex} / {totalCards}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-text-secondary bg-card px-3 py-1.5 rounded-pill border border-border">
            <Clock className="w-4 h-4" />
            <span className="font-label font-semibold text-xs tabular-nums">
              08:14
            </span>
          </div>
          <button className="hidden lg:block p-2 text-text-secondary hover:bg-card rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Progress Bar (Hidden on Desktop) */}
      <div className="w-full h-1 bg-border/50 lg:hidden">
        <div
          className={`h-full transition-all duration-500 ease-out rounded-r-pill ${sessionState === "celebration" ? "bg-secondary shadow-[0_0_8px_rgba(29,158,117,0.6)]" : "bg-primary"}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-row justify-center items-stretch gap-8 lg:p-8 relative">
        {/* LEFT COLUMN: Desktop Stats */}
        <aside className="hidden lg:flex w-56 flex-col gap-6 pt-4 shrink-0">
          <h4 className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
            Session Progress
          </h4>
          <div className="space-y-4">
            <div>
              <div className="font-label text-xs text-text-secondary mb-1">
                Cards Done
              </div>
              <div className="font-heading font-bold text-4xl text-text-primary">
                {currentCardIndex}
              </div>
            </div>
            <div>
              <div className="font-label text-xs text-text-secondary mb-1">
                Remaining
              </div>
              <div className="font-heading font-bold text-3xl text-text-secondary">
                {totalCards - currentCardIndex}
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="font-label text-xs text-text-secondary mb-1">
                Accuracy
              </div>
              <div className="font-heading font-bold text-3xl text-secondary">
                94%
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Arena */}
        <main className="flex-1 w-full max-w-[550px] px-4 lg:px-0 flex flex-col pt-6 pb-8 relative z-10 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 text-text-secondary justify-center">
            <Folder className="w-4 h-4" />
            <span className="font-label font-semibold text-xs uppercase tracking-wider">
              CS / Engineering
            </span>
          </div>

          {/* Phase B: Celebration Overlay (XP + Success Icon) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-all duration-500 ${sessionState === "celebration" ? "opacity-100 -translate-y-4" : "opacity-0 translate-y-4"}`}
          >
            <Check className="w-16 h-16 text-secondary bg-secondary-light rounded-full p-2 mb-4 shadow-lg" />
            <h2 className="font-heading font-bold text-3xl text-secondary tracking-tight">
              +140 XP Total!
            </h2>
          </div>

          {/* The Card Element */}
          <article
            onContextMenu={(e) => {
              e.preventDefault();
              handleLongPress();
            }}
            className={`flex-1 bg-card rounded-large-card border shadow-sm p-6 lg:p-10 flex flex-col relative mb-8 transition-all duration-500 ease-in-out ${
              isFlipped
                ? "border-t-4 border-t-primary border-x-border border-b-border bg-secondary-light/30"
                : "border-border hover:shadow-md cursor-pointer"
            } ${sessionState === "celebration" ? "translate-x-[120%] opacity-0 rotate-6" : "translate-x-0 opacity-100"}`}
            onClick={!isFlipped ? handleShowAnswer : undefined}
          >
            <div className="absolute top-5 right-5 bg-primary-light text-primary font-label font-bold text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider">
              CORE
            </div>

            {!isFlipped ? (
              <>
                <div className="flex-1 flex items-center justify-center text-center mt-6">
                  <h2 className="font-heading font-bold text-2xl text-text-primary leading-tight">
                    Explain the time complexity of QuickSort in the worst case.
                  </h2>
                </div>
                <div className="mt-8 pt-6 border-t border-dashed border-border text-center flex flex-col items-center gap-2 opacity-60">
                  <p className="font-body font-normal text-sm text-text-secondary">
                    Think about it before revealing
                  </p>
                  <div className="flex items-center gap-2 text-text-secondary mt-1">
                    <Touchpad className="w-5 h-5" />
                    <span className="font-label font-semibold text-xs uppercase tracking-wider">
                      Tap card to flip
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <header className="mb-6">
                  <span className="font-label font-bold text-xs text-secondary tracking-widest uppercase bg-secondary-light px-2 py-1 rounded">
                    Answer
                  </span>
                </header>
                <div className="mb-6">
                  <p className="font-body font-normal text-sm text-text-secondary italic line-clamp-2">
                    Explain the time complexity of QuickSort in the worst case.
                  </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h3 className="font-heading font-bold text-4xl text-text-primary text-center">
                    O(n²)
                  </h3>
                </div>
                <div className="mt-auto border-t border-border/50 pt-6">
                  <p className="font-body font-normal text-sm text-text-secondary text-center leading-relaxed">
                    This occurs when the pivot chosen is consistently the
                    greatest or smallest element, leading to highly unbalanced
                    partitions.
                  </p>
                </div>
              </>
            )}
          </article>

          {/* ACTION CONTROLS */}
          <div
            className={`mt-auto relative transition-opacity duration-300 ${sessionState === "celebration" ? "opacity-0" : "opacity-100"}`}
          >
            {!isFlipped ? (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleShowAnswer}
                  className="w-full bg-card border border-border rounded-card py-4 flex items-center justify-center gap-2 hover:bg-background transition-colors shadow-sm active:scale-[0.98]"
                >
                  <Eye className="w-5 h-5 text-text-primary" />
                  <span className="font-label font-bold text-sm text-text-primary">
                    Show answer
                  </span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleRating}
                    className="w-full h-14 bg-card border border-error text-error hover:bg-error-light/50 rounded-input flex items-center justify-center font-label font-bold text-lg transition-colors active:scale-95"
                  >
                    1
                  </button>
                  <span className="font-label font-semibold text-[10px] text-text-secondary mt-2 text-center uppercase tracking-wider">
                    Forgot
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    onClick={handleRating}
                    className="w-full h-14 bg-card border border-tertiary text-tertiary hover:bg-tertiary-light/50 rounded-input flex items-center justify-center font-label font-bold text-lg transition-colors active:scale-95"
                  >
                    2
                  </button>
                  <span className="font-label font-semibold text-[10px] text-text-secondary mt-2 text-center uppercase tracking-wider">
                    Hard
                  </span>
                </div>

                <div className="flex flex-col items-center relative">
                  <div
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 text-primary font-heading font-bold text-lg whitespace-nowrap z-10 transition-all duration-700 ease-out ${showXP ? "opacity-100 -translate-y-4" : "opacity-0 translate-y-0"}`}
                  >
                    +10 XP
                  </div>
                  <button
                    onClick={handleRating}
                    className="w-full h-14 bg-primary text-white hover:bg-primary-dark rounded-input flex items-center justify-center font-label font-bold text-lg transition-colors active:scale-[0.95] shadow-sm"
                  >
                    3
                  </button>
                  <span className="font-label font-bold text-[10px] text-primary mt-2 text-center uppercase tracking-wider">
                    Got it
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    onClick={handleRating}
                    className="w-full h-14 bg-card border border-secondary text-secondary hover:bg-secondary-light/50 rounded-input flex items-center justify-center font-label font-bold text-lg transition-colors active:scale-95"
                  >
                    4
                  </button>
                  <span className="font-label font-semibold text-[10px] text-text-secondary mt-2 text-center uppercase tracking-wider">
                    Easy
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT COLUMN: Desktop Keyboard Shortcuts */}
        <aside className="hidden lg:flex w-56 flex-col gap-6 pt-4 shrink-0">
          <h4 className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
            Keyboard Shortcuts
          </h4>
          <div className="bg-card p-4 rounded-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body font-normal text-sm text-text-primary">
                Show Answer
              </span>
              <kbd className="px-2 py-1 bg-background rounded border border-border font-label font-semibold text-[10px] text-text-secondary shadow-sm">
                Space
              </kbd>
            </div>
            <div className="h-px bg-border/50 my-2" />
            <div className="flex items-center justify-between">
              <span className="font-body font-normal text-sm text-error">
                Again
              </span>
              <kbd className="px-2 py-1 bg-background rounded border border-border font-label font-semibold text-[10px] text-text-secondary shadow-sm">
                1
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body font-normal text-sm text-text-primary">
                Hard
              </span>
              <kbd className="px-2 py-1 bg-background rounded border border-border font-label font-semibold text-[10px] text-text-secondary shadow-sm">
                2
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body font-normal text-sm text-text-primary">
                Good
              </span>
              <kbd className="px-2 py-1 bg-background rounded border border-border font-label font-semibold text-[10px] text-text-secondary shadow-sm">
                3
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body font-normal text-sm text-primary">
                Easy
              </span>
              <kbd className="px-2 py-1 bg-background rounded border border-border font-label font-semibold text-[10px] text-text-secondary shadow-sm">
                4
              </kbd>
            </div>
          </div>
        </aside>
      </div>

      {/* ========================================== */}
      {/* OVERLAYS & MODALS                          */}
      {/* ========================================== */}

      {(sessionState === "paused" || sessionState === "options") && (
        <div
          className="fixed inset-0 bg-text-primary/40 z-50 backdrop-blur-sm transition-opacity"
          onClick={() => setSessionState("active")}
        />
      )}

      {/* PHASE A: Abandoned Confirmation Dialog */}
      {sessionState === "paused" && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] bg-card/90 backdrop-blur-md border border-border rounded-large-card shadow-lg z-50 flex flex-col items-center p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-5 bg-primary rounded-sm" />
              <div className="w-1.5 h-5 bg-primary rounded-sm" />
            </div>
          </div>
          <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
            Take a break?
          </h3>
          <p className="font-body font-normal text-xs text-text-secondary text-center mb-6 leading-relaxed">
            You&apos;ve reviewed {currentCardIndex} cards so far. Your progress
            is saved, but momentum matters.
          </p>

          <div className="w-full space-y-3">
            <button
              onClick={() => setSessionState("active")}
              className="w-full bg-primary text-white rounded-input py-3 font-label font-bold text-sm active:scale-95 transition-transform"
            >
              Resume session
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-transparent border border-primary text-primary rounded-input py-3 font-label font-bold text-sm active:scale-95 transition-transform hover:bg-primary-light/50"
            >
              Save & exit
            </button>
          </div>
        </div>
      )}

      {/* Card Options Bottom Sheet */}
      {sessionState === "options" && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-card rounded-t-large-card z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] flex flex-col animate-in slide-in-from-bottom-full duration-300">
          <div className="flex flex-col items-center pt-4 pb-6 px-6">
            <div className="w-12 h-1 bg-border rounded-pill mb-4" />
            <h3 className="font-label font-bold text-sm text-text-primary w-full text-left">
              Card options
            </h3>
          </div>

          <div className="flex flex-col w-full pb-2">
            <button className="w-full flex items-center px-6 py-4 hover:bg-background transition-colors text-left group">
              <Flag className="w-5 h-5 text-primary mr-4" />
              <span className="font-label font-semibold text-sm text-text-primary flex-1">
                Mark as Core
              </span>
            </button>
            <button className="w-full flex items-center px-6 py-4 hover:bg-background transition-colors text-left group">
              <Tag className="w-5 h-5 text-text-secondary mr-4" />
              <span className="font-label font-semibold text-sm text-text-primary flex-1">
                Mark as Optional
              </span>
            </button>
            <button className="w-full flex items-center px-6 py-4 hover:bg-background transition-colors text-left group">
              <Edit3 className="w-5 h-5 text-text-primary mr-4" />
              <span className="font-label font-semibold text-sm text-text-primary flex-1">
                Edit this card
              </span>
            </button>
            <button className="w-full flex items-center px-6 py-4 hover:bg-error-light/50 transition-colors text-left group">
              <Ban className="w-5 h-5 text-error mr-4" />
              <span className="font-label font-semibold text-sm text-error flex-1">
                Suspend card
              </span>
            </button>
          </div>

          <div className="px-6 pb-8 pt-4 bg-background border-t border-border">
            <button
              onClick={() => setSessionState("active")}
              className="w-full py-3.5 bg-card border border-border rounded-card font-label font-bold text-sm text-text-primary hover:bg-border/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
