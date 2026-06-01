"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
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
  Home,
  Settings,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { XPBar } from "@/components/ui/XPBar";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Card {
  id: string;
  front: string;
  back: string;
  deckId: string;
  importance?: string;
}

interface SessionResult {
  cards: Card[];
  count: number;
  mode: string;
}

// Custom CountUp hook with ease-out quad animation
function useCountUp(target: number, duration: number = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [target, duration]);

  return value;
}

// ─── Rating config ────────────────────────────────────────────────────────────

const RATINGS = [
  {
    label: "Forgot",
    value: 1,
    index: 0,
    shortcut: "1",
    color: "text-[#E24B4A]",
    border: "border-[#E24B4A]/40",
    hover: "hover:bg-[#E24B4A]/10 hover:border-[#E24B4A]",
    popupColor: "text-[#E24B4A]",
    xp: 5,
  },
  {
    label: "Hard",
    value: 2,
    index: 1,
    shortcut: "2",
    color: "text-[#BA7517]",
    border: "border-[#BA7517]/40",
    hover: "hover:bg-[#BA7517]/10 hover:border-[#BA7517]",
    popupColor: "text-[#BA7517]",
    xp: 8,
  },
  {
    label: "Got it",
    value: 3,
    index: 2,
    shortcut: "3",
    color: "text-[#5C51E8]",
    border: "border-[#5C51E8]/40",
    hover: "hover:bg-[#5C51E8]/10 hover:border-[#5C51E8]",
    popupColor: "text-[#5C51E8]",
    xp: 10,
  },
  {
    label: "Easy",
    value: 4,
    index: 3,
    shortcut: "4",
    color: "text-[#1D9E75]",
    border: "border-[#1D9E75]/40",
    hover: "hover:bg-[#1D9E75]/10 hover:border-[#1D9E75]",
    popupColor: "text-[#1D9E75]",
    xp: 15,
  },
] as const;

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReviewSessionPage() {
  const router = useRouter();
  const params = useParams();

  // Derive deck id from route param (optional)
  const deckId = Array.isArray(params?.deckId)
    ? params.deckId[0]
    : (params?.deckId as string | undefined);

  // ── Session data (real) ────────────────────────────────────────────────────
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [loadError, setLoadError] = useState("");

  // ── UI State ───────────────────────────────────────────────────────────────
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionState, setSessionState] = useState<
    "active" | "paused" | "options" | "celebration" | "summary"
  >("active");
  const [popups, setPopups] = useState<
    Array<{ id: number; amount: number; buttonIndex: number }>
  >([]);

  // ── Session progress ───────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finalStreak, setFinalStreak] = useState(0);

  // ── Timer ──────────────────────────────────────────────────────────────────
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Load session ──────────────────────────────────────────────────────────
  useEffect(() => {
    const url = deckId
      ? `/api/review/session?deck_id=${deckId}`
      : "/api/review/session";

    fetch(url, { credentials: "include" })
      .then(async (res) => {
        const data: SessionResult = await res.json();
        if (!res.ok) throw new Error((data as { error?: string }).error ?? "Failed to load session");
        if (!data.cards || data.cards.length === 0) {
          // No cards due — go directly to summary with zeros
          setSessionState("summary");
        }
        setCards(data.cards ?? []);
        setIsLoadingSession(false);
      })
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : "Could not load session.");
        setIsLoadingSession(false);
      });
  }, [deckId]);

  // ─── Start timer once loaded ───────────────────────────────────────────────
  useEffect(() => {
    if (isLoadingSession || sessionState !== "active") return;
    timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isLoadingSession, sessionState]);

  // ─── Confetti on completion ────────────────────────────────────────────────
  useEffect(() => {
    if (sessionState === "summary") {
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
      const t = setTimeout(() => {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [sessionState]);

  // ─── Keyboard shortcuts ────────────────────────────────────────────────────
  const handleRating = useCallback(
    (rating: (typeof RATINGS)[number], skipAnimation = false) => {
      if (!isFlipped || sessionState !== "active") return;

      const { index, xp: xpAmount, value } = rating;

      // XP popup
      const id = Date.now() + Math.random();
      if (!skipAnimation) {
        setPopups((prev) => [...prev, { id, amount: xpAmount, buttonIndex: index }]);
        setTimeout(() => setPopups((prev) => prev.filter((p) => p.id !== id)), 900);
      }

      // Fire API in background (non-blocking)
      const currentCard = cards[currentIndex];
      if (currentCard) {
        fetch("/api/review", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ card_id: currentCard.id, rating: value }),
        })
          .then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              if (data.streak) setFinalStreak(data.streak);
            }
          })
          .catch(() => {/* silent — don't break UX */});
      }

      // Accumulate XP & accuracy
      setTotalXP((prev) => prev + xpAmount);
      if (value >= 3) setCorrectCount((prev) => prev + 1);

      // Advance to next card or end session
      const isLastCard = currentIndex >= cards.length - 1;
      if (isLastCard) {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => {
          setSessionState("celebration");
          setTimeout(() => setSessionState("summary"), 700);
        }, 400);
      } else {
        setTimeout(() => {
          setIsFlipped(false);
          setCurrentIndex((prev) => prev + 1);
        }, skipAnimation ? 0 : 700);
      }
    },
    [isFlipped, sessionState, currentIndex, cards]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === " " && !isFlipped) {
        e.preventDefault();
        setIsFlipped(true);
        return;
      }
      if (isFlipped) {
        const r = RATINGS.find((r) => r.shortcut === e.key);
        if (r) handleRating(r, true);
      }
      if (e.key === "Escape") setSessionState("paused");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFlipped, handleRating]);

  // ─── Derived values ────────────────────────────────────────────────────────
  const totalCards = cards.length;
  const progressPercent = totalCards > 0 ? (currentIndex / totalCards) * 100 : 0;
  const currentCard = cards[currentIndex] ?? null;
  const elapsedMin = Math.floor(elapsedSeconds / 60);
  const elapsedSec = elapsedSeconds % 60;
  const timeLabel = `${String(elapsedMin).padStart(2, "0")}:${String(elapsedSec).padStart(2, "0")}`;
  const accuracyPct =
    currentIndex > 0 ? Math.round((correctCount / currentIndex) * 100) : 0;

  // ─── Count-up values for summary ──────────────────────────────────────────
  const cardsReviewedVal = useCountUp(sessionState === "summary" ? totalCards : 0);
  const correctVal = useCountUp(sessionState === "summary" ? correctCount : 0);
  const xpEarnedVal = useCountUp(sessionState === "summary" ? totalXP : 0);
  const streakVal = useCountUp(sessionState === "summary" ? (finalStreak || 1) : 0);

  // ═══════════════════════════════════════════════════════════════════════════
  // LOADING STATE
  // ═══════════════════════════════════════════════════════════════════════════

  if (isLoadingSession) {
    return (
      <div className="bg-[#0f0f0e] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#5C51E8] animate-spin" />
          <p className="text-[#888780] font-body text-sm">Loading your session…</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-[#0f0f0e] min-h-screen flex items-center justify-center px-6">
        <div className="max-w-sm w-full bg-[#1a1a18] border border-[#2c2c2a] rounded-[16px] p-8 flex flex-col items-center text-center gap-4">
          <AlertTriangle className="w-10 h-10 text-[#E24B4A]" />
          <h2 className="font-heading font-bold text-xl text-[#f5f5f3]">Session error</h2>
          <p className="font-body text-sm text-[#888780]">{loadError}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-[#5C51E8] text-white py-2.5 rounded-[12px] font-label font-semibold text-sm hover:bg-[#3c3489] transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SUMMARY VIEW
  // ═══════════════════════════════════════════════════════════════════════════

  if (sessionState === "summary") {
    return (
      <div className="bg-[#0f0f0e] min-h-screen text-[#f5f5f3] font-body antialiased flex flex-col items-center py-12 px-6 relative overflow-hidden">
        {/* CSS Confetti Overlay */}
        <div className="absolute inset-0 pointer-events-none confetti-overlay z-0" aria-hidden="true" />

        <header className="w-full max-w-2xl flex justify-between items-center mb-8 relative z-10">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 rounded-full hover:bg-[#1a1a18] transition-colors text-[#888780] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-heading font-bold text-xl text-[#5C51E8]">Study Session</h1>
          <div className="w-10" />
        </header>

        <main className="w-full max-w-md flex flex-col items-center relative z-10 animate-in slide-in-from-bottom-8 duration-500">
          {/* Hero */}
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="w-20 h-20 bg-[#1D9E75] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-[#1D9E75]/20"
            >
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>
            <h2 className="font-heading font-bold text-4xl text-[#f5f5f3] mb-2 leading-tight">
              {totalCards === 0 ? "All caught up!" : "Session complete!"}
            </h2>
            <p className="font-body text-lg text-[#888780]">
              {totalCards === 0 ? "No cards are due right now." : "Your memory just got stronger."}
            </p>
          </div>

          {/* Streak pill */}
          <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-full px-6 py-2 flex items-center gap-2 mb-8 shadow-sm">
            <Flame className="w-5 h-5 text-[#1D9E75] fill-[#1D9E75]" />
            <span className="font-label font-bold text-sm text-[#1D9E75]">
              {streakVal} day streak maintained!
            </span>
          </div>

          {/* Stats grid */}
          <div className="bg-[#1a1a18] border border-[#2c2c2a] rounded-[16px] w-full p-6 shadow-sm mb-6">
            <div className="grid grid-cols-2 gap-y-6 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#2c2c2a] -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[#2c2c2a] -translate-y-1/2" />

              <div className="flex flex-col items-center pr-4 pb-4">
                <span className="font-heading font-bold text-2xl text-[#f5f5f3]">{cardsReviewedVal}</span>
                <span className="font-label font-semibold text-xs text-[#888780] uppercase tracking-wider mt-1">Cards reviewed</span>
              </div>
              <div className="flex flex-col items-center pl-4 pb-4">
                <span className="font-heading font-bold text-2xl text-[#1D9E75]">{correctVal}</span>
                <span className="font-label font-semibold text-xs text-[#888780] uppercase tracking-wider text-center mt-1">Correct first try</span>
              </div>
              <div className="flex flex-col items-center pr-4 pt-4">
                <span className="font-heading font-bold text-2xl text-[#5C51E8]">+{xpEarnedVal}</span>
                <span className="font-label font-semibold text-xs text-[#888780] uppercase tracking-wider mt-1">XP Earned</span>
              </div>
              <div className="flex flex-col items-center pl-4 pt-4">
                <span className="font-heading font-bold text-2xl text-[#f5f5f3]">{timeLabel}</span>
                <span className="font-label font-semibold text-xs text-[#888780] uppercase tracking-wider mt-1">Time spent</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2c2c2a]">
              <XPBar currentXP={xpEarnedVal} targetXP={500} size="standard" state="normal" />
            </div>
          </div>

          {/* CTA */}
          <div className="w-full flex flex-col gap-3 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/dashboard")}
              className="w-full h-12 bg-[#5C51E8] text-white rounded-[12px] font-label font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#3c3489] transition-all shadow-md shadow-[#5C51E8]/10 cursor-pointer"
            >
              <Home className="w-4 h-4 mr-2" /> Return to Dashboard
            </motion.button>
          </div>
        </main>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // REVIEW ARENA
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="bg-[#0f0f0e] min-h-screen text-[#f5f5f3] font-body antialiased flex flex-col items-center select-none overflow-hidden">

      {/* ─── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 bg-[#0f0f0e]/95 backdrop-blur-sm flex justify-between items-center w-full max-w-6xl mx-auto px-4 lg:px-8 h-16 pt-2 md:pt-4 z-40 border-b border-[#2c2c2a]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSessionState("paused")}
            className="p-2 -ml-2 rounded-full hover:bg-[#1a1a18] transition-colors text-[#888780] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="hidden lg:block font-label font-semibold text-sm text-[#888780]">Exit Session</span>
        </div>

        {/* Desktop progress bar */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-8">
          <div className="w-full h-2 bg-[#2c2c2a] rounded-full relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out ${
                sessionState === "celebration" ? "bg-[#1D9E75] shadow-[0_0_8px_rgba(29,158,117,0.6)]" : "bg-[#5C51E8]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Mobile counter */}
        <div className="lg:hidden font-heading font-bold text-lg tabular-nums text-[#f5f5f3]">
          {currentIndex} / {totalCards}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#888780] bg-[#1a1a18] px-3 py-1.5 rounded-full border border-[#2c2c2a]">
            <Clock className="w-4 h-4" />
            <span className="font-label font-semibold text-xs tabular-nums">{timeLabel}</span>
          </div>
          <button className="hidden lg:block p-2 text-[#888780] hover:bg-[#1a1a18] rounded-full transition-colors cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile progress bar */}
      <div className="w-full h-1 bg-[#2c2c2a] lg:hidden">
        <div
          className={`h-full transition-all duration-500 ease-out rounded-r-full ${
            sessionState === "celebration" ? "bg-[#1D9E75]" : "bg-[#5C51E8]"
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ─── BODY ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-row justify-center items-stretch gap-8 lg:p-8 relative">

        {/* LEFT: Session stats */}
        <aside className="hidden lg:flex w-56 flex-col gap-6 pt-4 shrink-0">
          <h4 className="font-label font-semibold text-xs text-[#888780] uppercase tracking-wider">Session Progress</h4>
          <div className="space-y-4">
            <div>
              <div className="font-label text-xs text-[#888780] mb-1">Cards Done</div>
              <div className="font-heading font-bold text-4xl text-[#f5f5f3] tabular-nums">{currentIndex}</div>
            </div>
            <div>
              <div className="font-label text-xs text-[#888780] mb-1">Remaining</div>
              <div className="font-heading font-bold text-3xl text-[#888780] tabular-nums">{totalCards - currentIndex}</div>
            </div>
            <div className="pt-4 border-t border-[#2c2c2a]">
              <div className="font-label text-xs text-[#888780] mb-1">Accuracy</div>
              <div className="font-heading font-bold text-3xl text-[#1D9E75] tabular-nums">{accuracyPct}%</div>
            </div>
          </div>
        </aside>

        {/* CENTER: Card arena */}
        <main className="flex-1 w-full max-w-[680px] px-4 lg:px-0 flex flex-col pt-6 pb-8 relative z-10 overflow-hidden">

          {/* Deck label */}
          <div className="flex items-center gap-2 mb-4 text-[#888780] justify-center">
            <Folder className="w-4 h-4" />
            <span className="font-label font-semibold text-xs uppercase tracking-wider">
              {currentCard?.importance === "core" ? "Core" : "Review"}
            </span>
          </div>

          {/* Celebration overlay */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-all duration-500 ${
              sessionState === "celebration" ? "opacity-100 -translate-y-4" : "opacity-0 translate-y-4"
            }`}
          >
            <Check className="w-16 h-16 text-[#1D9E75] bg-[#1D9E75]/10 border border-[#1D9E75]/35 rounded-full p-2 mb-4 shadow-lg" />
            <h2 className="font-heading font-bold text-3xl text-[#1D9E75] tracking-tight">
              +{totalXP} XP Total!
            </h2>
          </div>

          {/* ─── FLASHCARD ────────────────────────────────────────────────── */}
          <div
            className={`flex-1 w-full mb-8 relative select-none cursor-pointer ${
              sessionState === "celebration"
                ? "transition-all duration-500 translate-x-[120%] opacity-0 rotate-6"
                : ""
            }`}
            style={{ perspective: "1000px", minHeight: "360px" }}
            onClick={!isFlipped ? () => setIsFlipped(true) : undefined}
            onContextMenu={(e) => { e.preventDefault(); setSessionState("options"); }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 bg-[#18181b] rounded-[16px] border border-[#2c2c2a] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 lg:p-10 flex flex-col justify-between hover:border-[#3c3c3a] transition-all duration-200"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                  WebkitTransform: "rotateY(0deg)"
                }}
              >
                <div className="absolute top-5 right-5 bg-[#5C51E8]/10 text-[#5C51E8] font-label font-bold text-[9px] px-2 py-0.5 rounded border border-[#5C51E8]/20 uppercase tracking-widest">
                  {currentIndex + 1}/{totalCards}
                </div>

                <div className="flex-1 flex flex-col justify-center text-center my-auto py-4 overflow-y-auto max-h-[260px] scrollbar-thin">
                  <h2 className={`font-sans font-semibold text-[#f5f5f3] leading-snug ${
                    (currentCard?.front?.length ?? 0) > 300
                      ? "text-lg sm:text-xl"
                      : (currentCard?.front?.length ?? 0) > 150
                      ? "text-xl sm:text-2xl"
                      : "text-2xl sm:text-3xl"
                  }`}>
                    {currentCard?.front ?? "No cards due"}
                  </h2>
                </div>

                <div className="mt-8 pt-6 border-t border-dashed border-[#2c2c2a] text-center flex flex-col items-center gap-1.5 opacity-70 shrink-0">
                  <p className="font-sans text-xs text-[#888780]">Think about it before revealing</p>
                  <div className="flex items-center gap-1.5 text-[#888780] mt-0.5">
                    <Touchpad className="w-4 h-4" />
                    <span className="font-sans font-semibold text-[9px] uppercase tracking-widest">Tap to reveal · Space</span>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 bg-[#18181b] rounded-[16px] border border-[#2c2c2a] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 lg:p-10 flex flex-col justify-between hover:border-[#3c3c3a] transition-all duration-200"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  WebkitTransform: "rotateY(180deg)"
                }}
              >
                <header className="flex justify-between items-start shrink-0">
                  <span className="font-label font-bold text-[9px] text-[#1D9E75] tracking-widest uppercase bg-[#1D9E75]/10 border border-[#1D9E75]/20 px-2 py-0.5 rounded">
                    Answer
                  </span>
                  <div className="bg-[#5C51E8]/10 text-[#5C51E8] font-label font-bold text-[9px] px-2 py-0.5 rounded border border-[#5C51E8]/20 uppercase tracking-widest">
                    {currentIndex + 1}/{totalCards}
                  </div>
                </header>

                <div className="flex-1 flex flex-col justify-center my-auto py-4 overflow-y-auto max-h-[260px] scrollbar-thin">
                  <p className="font-sans text-xs text-[#888780] italic line-clamp-2 mb-3 text-center shrink-0">
                    {currentCard?.front}
                  </p>
                  <h3 className={`font-sans font-bold text-[#f5f5f3] text-center leading-snug ${
                    (currentCard?.back?.length ?? 0) > 300
                      ? "text-lg sm:text-xl"
                      : (currentCard?.back?.length ?? 0) > 150
                      ? "text-xl sm:text-2xl"
                      : "text-2xl sm:text-3xl"
                  }`}>
                    {currentCard?.back}
                  </h3>
                </div>

                <div className="mt-auto border-t border-[#2c2c2a] pt-4 shrink-0">
                  <p className="font-sans text-xs text-[#888780] text-center">
                    How well did you remember this?
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── ACTION CONTROLS ──────────────────────────────────────────── */}
          <div
            className={`mt-auto relative transition-opacity duration-300 ${
              sessionState === "celebration" ? "opacity-0" : "opacity-100"
            }`}
          >
            {!isFlipped ? (
              /* Show Answer Button */
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsFlipped(true)}
                className="w-full bg-[#1a1a18] border border-[#2c2c2a] rounded-[12px] py-3.5 flex items-center justify-center gap-2 hover:bg-[#222220] transition-colors shadow-sm cursor-pointer text-[#f5f5f3]"
              >
                <Eye className="w-4 h-4 text-[#888780]" />
                <span className="font-sans font-semibold text-sm">Show answer</span>
              </motion.button>
            ) : (
              /* Rating pills — Forgot / Hard / Got it / Easy */
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {RATINGS.map((rating) => (
                  <div key={rating.label} className="flex flex-col items-center relative">
                    {/* XP popup */}
                    <AnimatePresence>
                      {popups
                        .filter((p) => p.buttonIndex === rating.index)
                        .map((p) => (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 0, scale: 0.8 }}
                            animate={{ opacity: 1, y: -42, scale: 1.05 }}
                            exit={{ opacity: 0, y: -62 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`absolute -top-6 font-label font-extrabold text-[10px] uppercase tracking-widest pointer-events-none drop-shadow-sm z-30 ${rating.popupColor}`}
                          >
                            +{p.amount} XP
                          </motion.div>
                        ))}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleRating(rating)}
                      className={`w-full py-3 rounded-[10px] bg-[#18181b] border font-label font-bold text-sm transition-all shadow-sm cursor-pointer ${rating.color} ${rating.border} ${rating.hover}`}
                    >
                      {rating.label}
                    </motion.button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>


      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* OVERLAYS                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}

      {(sessionState === "paused" || sessionState === "options") && (
        <div
          className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm transition-opacity"
          onClick={() => setSessionState("active")}
        />
      )}

      {/* Pause dialog */}
      {sessionState === "paused" && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[320px] bg-[#18181b] border border-[#2c2c2a] rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-50 flex flex-col items-center p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-[#1a1a18] flex items-center justify-center mb-4 border border-[#2c2c2a]">
            <div className="flex gap-1.5">
              <div className="w-1.5 h-4 bg-[#888780] rounded-sm" />
              <div className="w-1.5 h-4 bg-[#888780] rounded-sm" />
            </div>
          </div>
          <h3 className="font-heading font-bold text-lg text-[#f5f5f3] mb-1.5">Take a break?</h3>
          <p className="font-body text-xs text-[#888780] text-center mb-6 leading-relaxed">
            You&apos;ve reviewed {currentIndex} cards so far. Your progress is saved, but momentum matters.
          </p>

          <div className="w-full space-y-2.5">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSessionState("active")}
              className="w-full bg-[#f5f5f3] text-[#0f0f0e] rounded-[10px] py-2.5 font-label font-semibold text-sm hover:bg-white transition-all cursor-pointer"
            >
              Resume session
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push("/dashboard")}
              className="w-full bg-transparent border border-[#2c2c2a] text-[#888780] rounded-[10px] py-2.5 font-label font-semibold text-sm hover:bg-[#1a1a18] transition-all cursor-pointer"
            >
              Save &amp; exit
            </motion.button>
          </div>
        </div>
      )}

      {/* Card options bottom sheet */}
      {sessionState === "options" && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#18181b] border-t border-[#2c2c2a] rounded-t-[16px] z-50 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] flex flex-col animate-in slide-in-from-bottom-full duration-300">
          <div className="flex flex-col items-center pt-4 pb-4 px-6">
            <div className="w-10 h-1 bg-[#2c2c2a] rounded-full mb-3" />
            <h3 className="font-label font-bold text-xs text-[#f5f5f3] w-full text-left uppercase tracking-widest">Card options</h3>
          </div>

          <div className="flex flex-col w-full pb-2">
            <button className="w-full flex items-center px-6 py-3.5 hover:bg-[#1a1a18] transition-colors text-left cursor-pointer">
              <Flag className="w-4 h-4 text-[#5C51E8] mr-4" />
              <span className="font-label font-semibold text-sm text-[#f5f5f3] flex-1">Mark as Core</span>
            </button>
            <button className="w-full flex items-center px-6 py-3.5 hover:bg-[#1a1a18] transition-colors text-left cursor-pointer">
              <Tag className="w-4 h-4 text-[#888780] mr-4" />
              <span className="font-label font-semibold text-sm text-[#f5f5f3] flex-1">Mark as Optional</span>
            </button>
            <button className="w-full flex items-center px-6 py-3.5 hover:bg-[#1a1a18] transition-colors text-left cursor-pointer">
              <Edit3 className="w-4 h-4 text-[#888780] mr-4" />
              <span className="font-label font-semibold text-sm text-[#f5f5f3] flex-1">Edit this card</span>
            </button>
            <button className="w-full flex items-center px-6 py-3.5 hover:bg-[#E24B4A]/10 transition-colors text-left cursor-pointer">
              <Ban className="w-4 h-4 text-[#E24B4A] mr-4" />
              <span className="font-label font-semibold text-sm text-[#E24B4A] flex-1">Suspend card</span>
            </button>
          </div>

          <div className="px-6 pb-8 pt-4 bg-[#09090b] border-t border-[#2c2c2a]/60">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSessionState("active")}
              className="w-full py-3 bg-[#18181b] border border-[#2c2c2a] rounded-[10px] font-label font-semibold text-sm text-[#f5f5f3] hover:bg-[#1a1a18] transition-colors cursor-pointer"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
