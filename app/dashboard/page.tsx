"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  Lightbulb,
  Info,
  TrendingDown,
  Loader2,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } },
} as const;

type Stats = {
  streak: number;
  xp: number;
  cards_reviewed_today: number;
  total_cards: number;
  due_today: number;
  accuracy_rate: number;
  weak_spots: Array<{ deckId: string; lapses: number; count: number }>;
  heatmap: Array<{ date: string; count: number }>;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [decks, setDecks] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/stats", { credentials: "include" }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load stats");
        return data;
      }),
      fetch("/api/decks", { credentials: "include" }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load decks");
        return data;
      }),
    ])
      .then(([statsData, decksData]) => {
        setStats(statsData);
        setDecks(decksData.decks || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Dashboard data could not be loaded.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-[1440px] mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="rounded-large-card border border-border bg-card p-10 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center">
          <Loader2 className="h-9 w-9 animate-spin text-primary mb-4" />
          <h1 className="font-heading text-2xl font-bold text-text-primary">Loading dashboard</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Pulling your review queue and activity.
          </p>
        </div>
      </div>
    );
  }

  const cardsDue = stats?.due_today ?? 0;
  const isNewUser = stats?.total_cards === 0;
  const isEmpty = cardsDue === 0;
  const isOverloaded = cardsDue > 100;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 md:p-10 max-w-[1440px] mx-auto space-y-8"
    >
      {error && (
        <motion.div
          variants={itemVariants}
          className="rounded-card border border-error/20 bg-error-light p-4 text-sm text-error-dark"
        >
          {error}
        </motion.div>
      )}

      {/* HEADER / GREETING */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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
      </motion.div>

      {/* 3-COLUMN DESKTOP COMMAND CENTER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================== */}
        {/* CENTER / PRIMARY ACTION COLUMN (Spans 8)   */}
        {/* ========================================== */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {isEmpty ? (
            /* NEW USER EMPTY STATE */
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -1.5 }}
              className="bg-card border border-border rounded-large-card p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="relative z-10 w-full">
                <h2 className="font-sans font-semibold text-lg mb-1 text-text-primary">
                  Today&apos;s Review
                </h2>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-sans font-bold text-6xl tracking-tight leading-none text-primary">
                    0
                  </span>
                  <span className="font-sans font-bold text-xs text-text-secondary uppercase tracking-widest">
                    cards due
                  </span>
                </div>
                <p className="font-sans text-sm text-text-secondary mb-6">
                  You&apos;re all caught up before you even started.
                </p>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Link
                    href="/study"
                    className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary-dark font-sans font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer self-start"
                  >
                    Add first card <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ) : isOverloaded ? (
            /* OVERLOAD STATE (Split Hero + Triage) */
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overdue Hero */}
              <div className="md:col-span-2 bg-red-50/40 dark:bg-[#180b0b]/60 text-red-800 dark:text-red-400 rounded-large-card p-6 shadow-[0_2px_12px_rgba(239,68,68,0.01)] relative overflow-hidden flex flex-col justify-between group border border-red-200/40 dark:border-red-900/30">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-sans font-semibold text-[10px] uppercase tracking-widest text-red-600 dark:text-red-400">
                      Overdue Review
                    </span>
                  </div>
                  <h2 className="font-sans font-bold text-4xl mb-2 tracking-tight text-red-900 dark:text-red-200">
                    {cardsDue} cards due
                  </h2>
                  <p className="font-sans text-xs text-red-600/80 dark:text-red-400/80 mb-6">
                    ~45 minutes total catch-up
                  </p>
                  <div className="flex gap-2 mb-8">
                    <span className="bg-red-100/60 dark:bg-red-950/40 text-red-800 dark:text-red-300 px-3 py-1 rounded-full font-sans font-semibold text-[10px] border border-red-200/50 dark:border-red-900/30">
                      400 review
                    </span>
                    <span className="bg-red-600 text-zinc-50 px-3 py-1 rounded-full font-sans font-bold text-[10px] shadow-sm">
                      142 critical
                    </span>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.01, y: -0.5 }} whileTap={{ scale: 0.99 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
                  <Link
                    href="/review"
                    className="relative z-10 bg-red-600 hover:bg-red-750 text-zinc-55 px-5 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer font-sans font-semibold text-xs text-white"
                  >
                    Start Catch-up <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>

              {/* Escape Hatch / Triage Card */}
              <div className="md:col-span-1 bg-card border border-zinc-200/60 dark:border-zinc-800/60 rounded-large-card p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)] relative overflow-hidden group">
                <div>
                  <div className="w-9 h-9 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-md flex items-center justify-center mb-4">
                    <Shield className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-sans font-bold text-lg mb-1.5 text-text-primary">
                    Overwhelmed?
                  </h3>
                  <p className="font-sans text-xs text-text-secondary mb-6 leading-relaxed">
                    Just do 20 critical cards today to rebuild your streak.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.01, y: -0.5 }} whileTap={{ scale: 0.99 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
                  <Link
                    href="/review"
                    className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-sans font-semibold text-xs px-4 py-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    Triage 20
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* STANDARD LUXURY HERO STATE */
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -1 }}
              className="bg-primary text-white rounded-large-card p-8 shadow-[0_8px_40px_rgba(92,81,232,0.25)] relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              {/* Subtle glow blob */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="relative z-10 w-full">
                <h2 className="font-sans font-semibold text-xs mb-1 text-white/60 uppercase tracking-widest">
                  Up Next for Review
                </h2>
                <p className="font-sans text-xs text-white/50 mb-6">
                  Optimized by spaced repetition
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-sans font-bold text-6xl tracking-tight leading-none text-white tabular-nums">
                    {cardsDue}
                  </span>
                  <span className="font-sans font-bold text-xs text-white/60 uppercase tracking-widest">
                    Cards Due
                  </span>
                </div>
                <motion.div whileHover={{ scale: 1.02, y: -0.5 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 28 }} className="self-start">
                  <Link
                    href="/review"
                    className="bg-white text-primary hover:bg-white/90 font-sans font-bold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    Start Session <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Quick Metrics Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border p-4 rounded-large-card shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-[8px] bg-primary/10 text-primary flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="font-label text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Decks</div>
                <div className="font-heading font-bold text-xl text-text-primary">{decks.length}</div>
              </div>
            </div>
            <div className="bg-card border border-border p-4 rounded-large-card shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-[8px] bg-tertiary/10 text-tertiary flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="font-label text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Due</div>
                <div className="font-heading font-bold text-xl text-text-primary">{cardsDue}</div>
              </div>
            </div>
            <div className="bg-card border border-border p-4 rounded-large-card shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-[8px] bg-secondary/10 text-secondary flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="font-label text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Accuracy</div>
                <div className="font-heading font-bold text-xl text-text-primary">{stats?.accuracy_rate ?? 0}%</div>
              </div>
            </div>
          </motion.div>

          {!isEmpty && (
            /* Severely Decayed Decks */
            <motion.div variants={itemVariants} className="mt-2">
              <h3 className="font-sans font-bold text-base text-text-primary mb-3">
                Severely Decayed Decks
              </h3>
              <div className="flex flex-col gap-4">
                {/* Decay Card 1 */}
                <motion.div
                  whileHover={{ y: -1.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-card rounded-large-card border border-zinc-200/60 dark:border-zinc-800/60 border-l-2 border-l-red-500 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01)] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-sans font-semibold text-base text-text-primary mb-1">
                      AWS Certified Solutions Architect
                    </h4>
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-xs text-text-secondary">
                        Last reviewed 3 weeks ago
                      </span>
                      <span className="text-red-600 dark:text-red-400 font-sans font-bold text-[9px] flex items-center gap-1 bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded border border-red-200/30 dark:border-red-900/20 uppercase tracking-wider">
                        <TrendingDown className="w-3 h-3" /> 104 overdue
                      </span>
                    </div>
                  </div>
                  <div className="w-full sm:w-32">
                    <div className="flex justify-between mb-1">
                      <span className="font-sans font-semibold text-[9px] text-text-secondary uppercase tracking-widest">
                        Mastery
                      </span>
                      <span className="font-sans font-bold text-xs text-red-550 dark:text-red-400">
                        14%
                      </span>
                    </div>
                    <div className="w-full h-[3px] bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "14%" }}
                        transition={{ type: "spring", stiffness: 100, damping: 18 }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ========================================== */}
        {/* RIGHT / INSIGHTS COLUMN (Spans 4)          */}
        {/* ========================================== */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {isEmpty ? (
            /* Empty-State Insight Banner */
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -0.5 }}
              className="bg-zinc-50 dark:bg-zinc-900/60 text-text-secondary rounded-large-card p-6 shadow-sm flex items-start gap-3 border border-zinc-200/60 dark:border-zinc-800/60"
            >
              <Info className="w-4.5 h-4.5 text-zinc-500 shrink-0 mt-0.5" />
              <p className="font-sans text-xs leading-relaxed">
                <strong className="text-text-primary">Welcome to RecallIQ.</strong> Every expert was once a
                beginner. Start by adding a few fundamental concepts to your
                first deck.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Daily Insight */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -0.5 }}
                className="bg-zinc-50 dark:bg-zinc-900/40 text-text-secondary rounded-large-card p-6 shadow-sm flex items-start gap-3 border border-zinc-200/60 dark:border-zinc-800/60"
              >
                <Lightbulb className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-semibold text-sm mb-1 text-text-primary">
                    Consistency wins
                  </h4>
                  <p className="font-sans text-xs opacity-90 leading-relaxed text-text-secondary">
                    Consistency beats intensity. Taking a break is normal. Use
                    the Triage feature to rebuild your habit slowly without
                    burning out.
                  </p>
                </div>
              </motion.div>

              {/* Recent Activity — clean 4-week grid */}
              <motion.div
                variants={itemVariants}
                className="bg-card border border-border rounded-large-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-label font-semibold text-xs text-text-secondary uppercase tracking-widest">
                    Recent Activity
                  </h4>
                  <span className="font-label text-[9px] text-text-secondary">
                    Last 4 weeks
                  </span>
                </div>

                {/* 7 rows × 4 cols — flow by column (week by week) */}
                <div
                  className="grid gap-1.5"
                  style={{ gridTemplateRows: 'repeat(7, 1fr)', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoFlow: 'column' }}
                >
                  {(() => {
                    const heatmapMap = new Map(
                      (stats?.heatmap ?? []).map(h => [h.date, h.count])
                    );
                    const maxCount = Math.max(1, ...(stats?.heatmap ?? []).map(h => h.count));
                    return Array.from({ length: 28 }).map((_, i) => {
                      const d = new Date();
                      d.setDate(d.getDate() - (27 - i));
                      const dateStr = d.toISOString().split('T')[0];
                      const count = heatmapMap.get(dateStr) ?? 0;
                      const intensity = count / maxCount;
                      const isToday = i === 27;
                      return (
                        <motion.div
                          whileHover={{ scale: 1.12 }}
                          key={i}
                          title={`${dateStr}: ${count} reviews`}
                          className="w-full aspect-square rounded-[4px] cursor-pointer transition-all"
                          style={
                            intensity === 0
                              ? {
                                  background: 'var(--color-background)',
                                  border: isToday ? '1.5px solid #5C51E8' : '1px solid var(--color-border)',
                                }
                              : {
                                  background: `rgba(92,81,232,${Math.max(0.18, intensity)})`,
                                  border: isToday ? '1.5px solid #5C51E8' : 'none',
                                }
                          }
                        />
                      );
                    });
                  })()}
                </div>

                <div className="flex justify-between mt-3 font-label text-[9px] text-text-secondary">
                  <span>4 weeks ago</span>
                  <span>Today</span>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
