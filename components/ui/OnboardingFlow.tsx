"use client";

import { useState } from "react";
import { FolderPlus, FileText, Play, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Deck {
  id: string;
  name: string;
  cardCount?: number;
}

interface Stats {
  streak: number;
  xp: number;
  cards_reviewed_today: number;
  total_cards: number;
  due_today: number;
  accuracy_rate: number;
}

interface OnboardingFlowProps {
  decks: Deck[];
  stats: Stats | null;
  onRefresh: () => void;
}

export function OnboardingFlow({ decks, stats, onRefresh }: OnboardingFlowProps) {
  // Calculate current step based on database state
  const totalCards = decks.reduce((acc, d) => acc + (d.cardCount || 0), 0);
  let step = 1;
  if (decks.length > 0) {
    if (totalCards === 0) {
      step = 2;
    } else {
      step = 3;
    }
  }

  // Step 1: Create deck form states
  const [deckName, setDeckName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deckName.trim()) return;

    setIsCreating(true);
    setCreateError("");

    try {
      const res = await fetch("/api/decks", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: deckName.trim(),
          description: "My first deck created during onboarding",
          domain: "General",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to create deck");
      }

      setDeckName("");
      onRefresh(); // Refresh dashboard data to auto advance to Step 2
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsCreating(false);
    }
  };

  // Find the target deck ID for Step 2 link
  const targetDeckId = decks[0]?.id ?? "";

  // Animation variants for smooth step transitions
  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full bg-card border border-border rounded-large-card p-6 md:p-10 shadow-sm relative overflow-hidden">
      {/* Progress Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-border pb-6">
        <div>
          <h2 className="font-heading font-bold text-xl text-text-primary">Welcome to RecallIQ!</h2>
          <p className="font-body text-xs text-text-secondary mt-1">Let&apos;s get your spaced repetition journey started in 3 simple steps.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-8 bg-primary"
                    : s < step
                    ? "w-2 bg-success"
                    : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
          <span className="font-label font-bold text-xs text-text-secondary">
            Step {step} of 3
          </span>
        </div>
      </div>

      {/* Steps Content Area with slide transitions */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[240px]"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <FolderPlus className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-text-primary">First, let&apos;s create a deck</h3>
                <p className="font-body text-sm text-text-secondary mt-1.5 max-w-lg">
                  A deck is a collection of cards on one topic. Think: Networking, DSA, Biology Chapter 3.
                </p>
              </div>

              <form onSubmit={handleCreateDeck} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
                <input
                  type="text"
                  placeholder="e.g. Computer Science Fundamentals"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  disabled={isCreating}
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary disabled:opacity-60"
                  required
                />
                <button
                  type="submit"
                  disabled={isCreating || !deckName.trim()}
                  className="bg-primary hover:bg-primary-dark text-white font-label font-bold text-xs px-6 py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Deck <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
              {createError && (
                <p className="text-xs text-error font-sans">{createError}</p>
              )}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[240px]"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
              <FileText className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-text-primary">Now paste something you studied</h3>
                <p className="font-body text-sm text-text-secondary mt-1.5 max-w-lg">
                  Copy any notes, a paragraph from a textbook, or anything you want to remember. AI will turn it into cards.
                </p>
              </div>

              <Link
                href={`/study?deckId=${targetDeckId}`}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-label font-bold text-xs px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Go to Add Content <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[240px]"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-success/10 rounded-full flex items-center justify-center text-success shrink-0">
              <Play className="w-10 h-10 md:w-12 md:h-12 fill-success" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-text-primary font-sans">You&apos;re ready. Let&apos;s study.</h3>
                <p className="font-body text-sm text-text-secondary mt-1.5 max-w-lg">
                  Review your cards now. The app will figure out when to show them again so you never forget.
                </p>
              </div>

              <Link
                href="/review"
                className="inline-flex items-center gap-2 bg-success hover:bg-success-dark text-white font-label font-bold text-xs px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Start Review <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
