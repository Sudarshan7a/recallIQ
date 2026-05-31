"use client";

import { Flame, Trophy, Snowflake } from "lucide-react";
import { motion } from "framer-motion";

type StreakState = "active" | "broken" | "at-risk" | "freeze";
type StreakSize = "sm" | "md" | "lg";

interface StreakBadgeProps {
  days: number;
  state?: StreakState;
  size?: StreakSize;
}

export function StreakBadge({
  days,
  state = "active",
  size = "md",
}: StreakBadgeProps) {
  // Sizing styles: clean height and pad
  const sizeClasses = {
    sm: "h-[26px] px-2.5 text-xs gap-1",
    md: "h-[32px] px-3.5 text-sm gap-1.5",
    lg: "h-[40px] px-4.5 text-base gap-2",
  }[size];

  const iconSize =
    size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";

  // Determine state-based quiet colors (Apple design: subtle light tints or dark mode solid grays)
  let isMilestone = false;
  let themeClasses = "";
  let Icon = Flame;

  if (state === "active") {
    if (days >= 100) {
      isMilestone = true;
      Icon = Trophy;
      themeClasses =
        "bg-amber-50/80 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30";
    } else if (days >= 30) {
      isMilestone = true;
      themeClasses =
        "bg-orange-50/80 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border-orange-200/40 dark:border-orange-900/20";
    } else if (days >= 7) {
      isMilestone = true;
      themeClasses =
        "bg-yellow-50/80 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 border-yellow-200/40 dark:border-yellow-900/20";
    } else {
      themeClasses =
        "bg-amber-50/80 dark:bg-amber-950/20 text-amber-600 dark:text-amber-500 border-amber-200/40 dark:border-amber-900/20";
    }
  } else if (state === "broken") {
    themeClasses =
      "bg-zinc-100/60 dark:bg-zinc-900/60 text-zinc-400 dark:text-zinc-550 border-zinc-200/50 dark:border-zinc-800/80";
  } else if (state === "at-risk") {
    themeClasses =
      "bg-red-50/80 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200/40 dark:border-red-900/20";
  } else if (state === "freeze") {
    Icon = Snowflake;
    themeClasses =
      "bg-blue-50/80 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-200/40 dark:border-blue-900/20";
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -0.5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`inline-flex items-center rounded-full font-sans font-medium transition-colors duration-200 cursor-pointer select-none border backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${sizeClasses} ${themeClasses}`}
    >
      <div className="flex items-center justify-center shrink-0">
        <Icon
          className={`${iconSize} ${state === "broken" ? "opacity-30" : "fill-current"}`}
        />
      </div>

      <span className="font-sans font-semibold tracking-tight flex items-center gap-0.5">
        <span className={state === "broken" ? "line-through opacity-40" : ""}>
          {days}
          {size !== "sm" && " days"}
        </span>
        {size === "sm" && "d"}
      </span>

      {state === "freeze" && size !== "sm" && (
        <span className="ml-1 text-[9px] uppercase tracking-widest font-semibold opacity-60">
          Frozen
        </span>
      )}
    </motion.div>
  );
}
