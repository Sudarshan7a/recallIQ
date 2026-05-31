"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Flame, Activity, ArrowRight } from "lucide-react";

const GOALS = [
  {
    id: "casual",
    title: "Casual",
    value: "5",
    label: "mins/day",
    text: "Casual learner",
    icon: Shield,
    tone: "secondary",
  },
  {
    id: "steady",
    title: "Steady",
    value: "15",
    label: "mins/day",
    text: "Serious student",
    icon: Activity,
    tone: "primary",
    recommended: true,
  },
  {
    id: "intense",
    title: "Intense",
    value: "30",
    label: "mins/day",
    text: "Exam warrior",
    icon: Flame,
    tone: "tertiary",
  },
];

export default function DailyGoalPage() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState("steady");

  const handleStartLearning = () => {
    // Triggers Phase B loading transition flow sequence
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-background text-text-primary font-body flex flex-col justify-between p-6 md:p-10 selection:bg-primary-light selection:text-primary-dark relative">
      {/* Background Tonal Layer Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] absolute" />
      </div>

      <header className="max-w-4xl w-full mx-auto flex items-center justify-start h-12 relative z-10">
        <button
          onClick={() => router.back()}
          className="text-text-secondary hover:text-text-primary font-label font-semibold text-sm transition-colors cursor-pointer"
        >
          Back
        </button>
      </header>

      <main className="max-w-4xl w-full mx-auto my-auto flex flex-col items-center py-6 relative z-10">
        <div className="text-center mb-12 space-y-2">
          <h1 className="font-heading font-bold text-3xl sm:text-[40px] tracking-tight text-text-primary">
            Set your daily goal.
          </h1>
          <p className="font-body font-normal text-text-secondary text-base sm:text-lg max-w-xl">
            Consistency is key to mastery. Choose a target that fits your
            training schedule.
          </p>
        </div>

        {/* Multi-Viewport Flow Selector (Responsive Stack-to-Row Array) */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl justify-center items-stretch mb-10">
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;

            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setSelectedGoal(goal.id)}
                className={`flex-1 min-w-[220px] bg-card border rounded-large-card p-6 flex flex-col items-center justify-center text-center relative transition-all duration-200 cursor-pointer focus:outline-none focus:ring-3 focus:ring-primary/40 ${
                  isSelected
                    ? "border-primary bg-primary-light/30 ring-2 ring-primary/10 shadow-md transform md:scale-105 z-10"
                    : "border-border hover:border-text-secondary/40 hover:shadow-sm"
                }`}
              >
                {/* Recommended Semantic Indicator Ribbon */}
                {goal.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white font-label font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded-pill shadow-sm">
                    Recommended
                  </div>
                )}

                {/* Specialized functional sign icon indicators */}
                <Icon
                  className={`w-8 h-8 mb-3 ${
                    isSelected
                      ? goal.tone === "secondary"
                        ? "text-secondary fill-secondary/10"
                        : goal.tone === "tertiary"
                          ? "text-tertiary fill-tertiary/10"
                          : "text-primary fill-primary/10"
                      : "text-text-secondary"
                  }`}
                />

                <h3
                  className={`font-heading font-bold text-lg mb-1 ${isSelected ? "text-text-primary" : "text-text-primary"}`}
                >
                  {goal.title}
                </h3>

                <div className="flex items-baseline gap-0.5 mb-2">
                  <span className="font-heading font-bold text-2xl text-primary">
                    {goal.value}
                  </span>
                  <span className="font-body font-normal text-xs text-text-secondary">
                    {goal.label}
                  </span>
                </div>

                <p className="font-body font-normal text-xs text-text-secondary">
                  {goal.text}
                </p>
              </button>
            );
          })}
        </div>

        <p className="text-center font-body font-normal text-xs sm:text-sm text-text-secondary max-w-sm mb-8 leading-relaxed">
          Most users who hit their goal in week 1 never stop. Start small if
          unsure.
        </p>

        {/* Launch Catalyst Button Container */}
        <button
          type="button"
          onClick={handleStartLearning}
          className="w-full max-w-[400px] h-14 bg-primary hover:bg-primary-dark text-white font-label font-semibold text-sm rounded-card flex items-center justify-center gap-2 shadow-md shadow-primary/10 transition-all active:scale-[0.99] cursor-pointer group"
        >
          <span>Start learning</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>

        <button
          onClick={handleStartLearning}
          className="mt-4 font-label font-semibold text-xs text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
        >
          I&apos;ll set this later
        </button>
      </main>

      <footer className="w-full max-w-4xl mx-auto flex justify-center items-center h-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-pill bg-border" />
          <div className="w-2 h-2 rounded-pill bg-border" />
          <div className="w-6 h-2 rounded-pill bg-primary transition-all duration-300" />
        </div>
      </footer>
    </div>
  );
}
