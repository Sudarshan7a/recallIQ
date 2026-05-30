"use client";

import React from "react";
import Card from "../../components/ui/Card";
import StatsOverview from "../../components/ui/StatsOverview";
import StatsEmpty from "../../components/ui/StatsEmpty";
import StreakBadge from "../../components/ui/StreakBadge";
import XPBar from "../../components/ui/XPBar";

export default function StatsPage() {
  const hasStats = true; // toggle for preview

  if (!hasStats) return <StatsEmpty />;

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-text-primary">
            Stats
          </h1>
          <p className="text-text-secondary text-sm">
            Your learning progress at a glance.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <StreakBadge days={12} />
          <div className="w-40">
            <XPBar xp={3420} max={5000} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatsOverview />
        </div>

        <aside>
          <Card className="p-4">
            <h3 className="text-sm text-text-secondary">Progress</h3>
            <div className="mt-2 text-text-primary text-lg font-semibold">
              72%
            </div>
            <div className="text-xs text-text-secondary">Overall mastery</div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
