"use client";

import { motion } from "framer-motion";

interface XPBarProps {
  currentXP: number;
  targetXP: number;
  size?: "thin" | "standard";
  state?: "normal" | "completed" | "overflow" | "bonus";
  showLabels?: boolean;
}

export function XPBar({
  currentXP,
  targetXP,
  size = "standard",
  state = "normal",
  showLabels = true,
}: XPBarProps) {
  const percentage = Math.min(Math.round((currentXP / targetXP) * 100), 100);

  // Slim Apple-style heights
  const heightClass = size === "thin" ? "h-[3px]" : "h-[5px]";

  // Subtle clean luxury solid colors or very soft transitions (no neon glowing shadows)
  let fillClass = "bg-indigo-600 dark:bg-indigo-500";
  if (state === "completed" || percentage >= 100) {
    fillClass = "bg-emerald-600 dark:bg-emerald-500";
  } else if (state === "overflow") {
    fillClass = "bg-sky-600 dark:bg-sky-500";
  } else if (state === "bonus") {
    fillClass = "bg-amber-500 dark:bg-amber-400";
  }

  return (
    <div className="w-full flex flex-col gap-1 font-sans">
      {/* Refined Labels */}
      {showLabels && (
        <div className="flex justify-between items-end mb-0.5">
          <span className="font-sans font-semibold text-[9px] text-text-secondary uppercase tracking-widest">
            XP Progress
          </span>
          <span className="font-sans font-bold text-xs text-text-primary">
            {currentXP}{" "}
            <span className="text-text-secondary font-normal font-sans">
              / {targetXP} XP
            </span>
          </span>
        </div>
      )}

      {/* Progress Track */}
      <div
        className={`w-full bg-zinc-200/60 dark:bg-[#2C2C2A] rounded-full overflow-hidden relative ${heightClass}`}
        role="progressbar"
        aria-valuenow={currentXP}
        aria-valuemin={0}
        aria-valuemax={targetXP}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 85, damping: 16 }}
          className={`h-full rounded-full relative overflow-hidden ${fillClass}`}
        >
          {/* Subtle low-opacity white reflection shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full xp-shimmer-bar" />
        </motion.div>
      </div>

      {/* Goal Hit Quiet Text */}
      {(state === "completed" || percentage >= 100) && showLabels && (
        <p className="font-sans font-semibold text-[9px] text-emerald-600 dark:text-emerald-500 text-right mt-0.5 uppercase tracking-wider">
          Weekly goal achieved
        </p>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes xp-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          50% { transform: translateX(100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
        .xp-shimmer-bar {
          animation: xp-shimmer 6.5s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
