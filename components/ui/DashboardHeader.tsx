"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { XPBar } from "./XPBar";
import { StreakBadge } from "./StreakBadge";
import { motion } from "framer-motion";
import { GlobalSearch } from "./GlobalSearch";

interface DashboardHeaderProps {
  level: number;
  xpInCurrentLevel: number;
  streak: number;
  initials: string;
}

export function DashboardHeader({
  level,
  xpInCurrentLevel,
  streak,
  initials,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/70 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 h-14 flex items-center justify-between px-6">
      <div className="md:hidden font-sans font-bold text-lg text-text-primary">
        RecallIQ
      </div>
      <div className="hidden md:block" /> {/* Spacer */}
      <div className="flex items-center gap-4">
        <GlobalSearch />
        {/* Streak & XP status */}
        <div className="hidden sm:flex items-center gap-5">
          {/* XP Bar */}
          <div className="flex items-center gap-2.5 w-44">
            <span className="font-sans font-semibold text-[9px] text-text-secondary whitespace-nowrap">
              Lvl {level}
            </span>
            <XPBar
              currentXP={xpInCurrentLevel}
              targetXP={500}
              size="thin"
              showLabels={false}
            />
          </div>

          {/* Streak Badge */}
          <StreakBadge
            days={streak}
            state={streak > 0 ? "active" : "broken"}
            size="sm"
          />
        </div>

        {/* Action icons */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-text-secondary hover:text-text-primary transition-colors p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer border border-transparent hover:border-zinc-200/40 dark:hover:border-zinc-700/40"
        >
          <Bell className="w-4 h-4" />
        </motion.button>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/dashboard/settings"
            className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-center text-text-secondary font-sans font-bold text-[10px] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
          >
            {initials}
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
