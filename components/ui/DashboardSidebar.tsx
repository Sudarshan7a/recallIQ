"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { SidebarNav } from "./SidebarNav";

interface DashboardSidebarProps {
  dueCount: number;
}

export function DashboardSidebar({ dueCount }: DashboardSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 border-r border-border bg-background/80 backdrop-blur-xl py-6 z-40">
      {/* Logo — matches landing page style */}
      <div className="px-6 mb-8">
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-[8px] bg-primary flex items-center justify-center shadow-sm shadow-primary/30">
            <span className="font-heading font-bold text-sm text-white">R</span>
          </div>
          <span className="font-heading font-bold text-xl text-text-primary tracking-tight">
            Recall<span className="text-primary">IQ</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <SidebarNav dueCount={dueCount} />

      {/* Review CTA at bottom */}
      <div className="px-5 mt-auto pt-4 border-t border-border">
        <Link
          href="/review"
          className="w-full bg-primary hover:bg-primary-dark text-white font-label font-semibold text-sm py-2.5 rounded-[10px] transition-all flex items-center justify-center gap-2 shadow-sm shadow-primary/20"
        >
          <BookOpen className="w-4 h-4" /> Start Review
        </Link>
      </div>
    </aside>
  );
}
