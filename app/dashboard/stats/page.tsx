import {
  Flame,
  Target,
  CheckCircle,
  Star,
  TrendingUp,
  Download,
} from "lucide-react";
import { XPBar } from "@/components/ui/XPBar";

export default function StatsPage() {
  return (
    <div className="p-6 md:p-10 max-w-[1440px] mx-auto space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary tracking-tight mb-1">
          Progress & Statistics
        </h1>
        <p className="font-body font-normal text-text-secondary text-sm md:text-base">
          Your learning progress at a glance.
        </p>
      </div>

      {/* METRIC CARDS ROW (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Streak */}
        <div className="bg-card border border-border rounded-large-card p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
              Current Streak
            </span>
            <div className="w-8 h-8 rounded-full bg-tertiary-light/50 flex items-center justify-center text-tertiary">
              <Flame className="w-4 h-4 fill-tertiary/20" />
            </div>
          </div>
          <div>
            <div className="font-heading font-bold text-4xl text-text-primary mb-1">
              14
              <span className="text-xl text-text-secondary font-medium ml-1">
                days
              </span>
            </div>
            <div className="font-body font-normal text-xs text-secondary flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +2 from last week
            </div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-card border border-border rounded-large-card p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
              Avg Accuracy
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="relative z-10">
            <div className="font-heading font-bold text-4xl text-text-primary mb-1">
              92
              <span className="text-xl text-text-secondary font-medium ml-1">
                %
              </span>
            </div>
            <div className="font-body font-normal text-xs text-text-secondary">
              Across all active decks
            </div>
          </div>
        </div>

        {/* Cards Mastered */}
        <div className="bg-card border border-border rounded-large-card p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
              Cards Mastered
            </span>
            <div className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center text-secondary">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-heading font-bold text-4xl text-text-primary mb-3">
              1,248
            </div>
            <div className="w-full bg-background h-1.5 rounded-pill overflow-hidden mb-1">
              <div
                className="bg-secondary h-full rounded-pill"
                style={{ width: "70%" }}
              />
            </div>
            <div className="font-body font-normal text-[10px] text-text-secondary text-right">
              70% of total
            </div>
          </div>
        </div>

        {/* XP Progress Component Integration */}
        <div className="bg-card border border-border rounded-large-card p-6 shadow-sm flex flex-col justify-between border-l-4 border-l-primary">
          <div className="flex justify-between items-start mb-6">
            <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
              XP Progress
            </span>
            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary">
              <Star className="w-4 h-4 fill-primary/20" />
            </div>
          </div>

          <div className="mt-auto">
            <XPBar
              currentXP={420}
              targetXP={500}
              size="standard"
              state="normal"
              showLabels={true}
            />
          </div>
        </div>
      </div>

      {/* CHARTS ROW (2 Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Retention Rate Area Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-large-card p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-text-primary">
                Retention Rate
              </h3>
              <p className="font-body font-normal text-sm text-text-secondary">
                Memory decay over time across top decks.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-pill bg-background border border-border font-label font-semibold text-xs text-text-secondary hover:text-text-primary transition-colors">
                Week
              </button>
              <button className="px-3 py-1 rounded-pill bg-primary text-white font-label font-semibold text-xs shadow-sm">
                Month
              </button>
              <button className="px-3 py-1 rounded-pill bg-background border border-border font-label font-semibold text-xs text-text-secondary hover:text-text-primary transition-colors">
                Year
              </button>
            </div>
          </div>

          {/* Faux Chart Display Area */}
          <div className="flex-1 relative min-h-[240px] flex items-end w-full pl-8 pb-6">
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-text-secondary font-label font-semibold text-[10px] pr-2 text-right w-8">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <div className="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between z-0">
              <div className="w-full border-t border-border/50 h-0" />
              <div className="w-full border-t border-border/50 h-0" />
              <div className="w-full border-t border-border/50 h-0" />
              <div className="w-full border-t border-border/50 h-0" />
              <div className="w-full border-t border-border/50 h-0" />
            </div>
            <div className="w-full h-full relative z-10 overflow-hidden pt-4">
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/5 to-primary/20"
                style={{
                  clipPath:
                    "polygon(0 80%, 20% 60%, 40% 65%, 60% 40%, 80% 45%, 100% 20%, 100% 100%, 0 100%)",
                }}
              />
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M 0 80 C 10 70, 15 60, 20 60 C 30 60, 35 65, 40 65 C 50 65, 55 40, 60 40 C 70 40, 75 45, 80 45 C 90 45, 95 20, 100 20"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="2.5"
                />
                <circle
                  cx="20"
                  cy="60"
                  r="1.5"
                  className="fill-card stroke-primary stroke-2"
                />
                <circle
                  cx="40"
                  cy="65"
                  r="1.5"
                  className="fill-card stroke-primary stroke-2"
                />
                <circle
                  cx="60"
                  cy="40"
                  r="1.5"
                  className="fill-card stroke-primary stroke-2"
                />
                <circle
                  cx="80"
                  cy="45"
                  r="1.5"
                  className="fill-card stroke-primary stroke-2"
                />
                <circle cx="100" cy="20" r="2.5" className="fill-primary" />
              </svg>
            </div>
            <div className="absolute left-8 right-0 bottom-0 flex justify-between text-text-secondary font-label font-semibold text-[10px] pt-2">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
              <span>Current</span>
            </div>
          </div>
        </div>

        {/* Topic Mastery Donut */}
        <div className="bg-card border border-border rounded-large-card p-6 shadow-sm flex flex-col">
          <h3 className="font-heading font-bold text-lg text-text-primary mb-1">
            Topic Mastery
          </h3>
          <p className="font-body font-normal text-sm text-text-secondary mb-8">
            Distribution of learned cards.
          </p>

          <div className="flex-1 flex flex-col justify-center items-center">
            {/* Native CSS Conic Gradient Donut */}
            <div
              className="relative w-48 h-48 rounded-full mb-8 flex items-center justify-center"
              style={{
                background:
                  "conic-gradient(var(--color-primary) 0% 45%, var(--color-secondary) 45% 75%, var(--color-tertiary) 75% 90%, var(--color-border) 90% 100%)",
              }}
            >
              <div className="w-32 h-32 bg-card rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="font-heading font-bold text-4xl text-text-primary">
                  4
                </span>
                <span className="font-label font-semibold text-[10px] text-text-secondary uppercase tracking-wider">
                  Active Topics
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full flex flex-col gap-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-body font-normal text-sm text-text-primary">
                    Neuroanatomy
                  </span>
                </div>
                <span className="font-label font-semibold text-xs text-text-secondary">
                  45%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="font-body font-normal text-sm text-text-primary">
                    Pharmacology
                  </span>
                </div>
                <span className="font-label font-semibold text-xs text-text-secondary">
                  30%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                  <span className="font-body font-normal text-sm text-text-primary">
                    Pathology
                  </span>
                </div>
                <span className="font-label font-semibold text-xs text-text-secondary">
                  15%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HEATMAP SECTION (Full Width) */}
      <div className="bg-card border border-border rounded-large-card p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary">
              90-Day Activity Heatmap
            </h3>
            <p className="font-body font-normal text-sm text-text-secondary">
              Daily review volume over the last 3 months.
            </p>
          </div>
          <div className="flex items-center gap-2 font-label font-semibold text-[10px] text-text-secondary">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-background border border-border" />
              <div className="w-3 h-3 rounded-sm bg-primary/20" />
              <div className="w-3 h-3 rounded-sm bg-primary/40" />
              <div className="w-3 h-3 rounded-sm bg-primary/60" />
              <div className="w-3 h-3 rounded-sm bg-primary/80" />
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="min-w-[800px]">
            <div className="flex justify-between font-label font-semibold text-[10px] text-text-secondary mb-2 px-1">
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-1.5">
              {Array.from({ length: 91 }).map((_, i) => {
                const intensity = ((i * 17) % 100) / 100;
                const bgClass =
                  intensity > 0.85
                    ? "bg-primary"
                    : intensity > 0.6
                      ? "bg-primary/60"
                      : intensity > 0.3
                        ? "bg-primary/30"
                        : "bg-background border border-border/50";
                return (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-sm ${bgClass} hover:ring-1 hover:ring-primary hover:scale-110 transition-all cursor-pointer`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-card border border-border rounded-large-card overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-background/50 flex justify-between items-center">
          <h3 className="font-heading font-bold text-lg text-text-primary">
            Weekly Breakdown
          </h3>
          <button className="text-primary font-label font-semibold text-sm hover:underline flex items-center gap-1 transition-colors">
            Export CSV <Download className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="p-4 font-label font-semibold text-xs text-text-secondary tracking-wider uppercase">
                  Week
                </th>
                <th className="p-4 font-label font-semibold text-xs text-text-secondary tracking-wider uppercase">
                  Total Reviews
                </th>
                <th className="p-4 font-label font-semibold text-xs text-text-secondary tracking-wider uppercase">
                  Accuracy
                </th>
                <th className="p-4 font-label font-semibold text-xs text-text-secondary tracking-wider uppercase">
                  New Cards Mastered
                </th>
                <th className="p-4 font-label font-semibold text-xs text-text-secondary tracking-wider uppercase text-right">
                  XP Earned
                </th>
              </tr>
            </thead>
            <tbody className="font-body font-normal text-sm text-text-primary">
              <tr className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="p-4 font-medium">Nov 18 - Nov 24</td>
                <td className="p-4">842</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-background border border-border h-1.5 rounded-pill overflow-hidden">
                      <div className="bg-secondary h-full w-[94%]" />
                    </div>
                    <span className="font-label font-semibold text-xs">
                      94%
                    </span>
                  </div>
                </td>
                <td className="p-4">112</td>
                <td className="p-4 text-right font-semibold text-primary">
                  3,450
                </td>
              </tr>
              <tr className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="p-4 font-medium">Nov 11 - Nov 17</td>
                <td className="p-4">756</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-background border border-border h-1.5 rounded-pill overflow-hidden">
                      <div className="bg-secondary h-full w-[91%]" />
                    </div>
                    <span className="font-label font-semibold text-xs">
                      91%
                    </span>
                  </div>
                </td>
                <td className="p-4">98</td>
                <td className="p-4 text-right font-semibold text-primary">
                  2,890
                </td>
              </tr>
              <tr className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="p-4 font-medium">Nov 04 - Nov 10</td>
                <td className="p-4">920</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-background border border-border h-1.5 rounded-pill overflow-hidden">
                      <div className="bg-secondary h-full w-[88%]" />
                    </div>
                    <span className="font-label font-semibold text-xs">
                      88%
                    </span>
                  </div>
                </td>
                <td className="p-4">145</td>
                <td className="p-4 text-right font-semibold text-primary">
                  4,120
                </td>
              </tr>
              <tr className="hover:bg-background/50 transition-colors">
                <td className="p-4 font-medium text-text-secondary">
                  Oct 28 - Nov 03
                </td>
                <td className="p-4 text-text-secondary">610</td>
                <td className="p-4 text-text-secondary">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-background border border-border h-1.5 rounded-pill overflow-hidden">
                      <div className="bg-text-secondary/50 h-full w-[85%]" />
                    </div>
                    <span className="font-label font-semibold text-xs">
                      85%
                    </span>
                  </div>
                </td>
                <td className="p-4 text-text-secondary">75</td>
                <td className="p-4 text-right font-semibold text-text-secondary">
                  2,100
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
