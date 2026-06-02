"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, ArrowRight, Sparkles } from "lucide-react";

export default function OnboardingWelcome() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNextStep = () => {
    setIsTransitioning(true);

    // Smooth timing match for Phase B expansion morphing rules
    setTimeout(() => {
      // Direct routing handoff to next logical step setup
      router.push("/onboarding/domain");
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-background text-text-primary font-body flex items-center justify-center overflow-x-hidden selection:bg-primary-light selection:text-primary-dark relative">
      {/* Morphing Expansion Layer (Phase B: The Bridge Execution) */}
      <div
        className={`fixed inset-0 bg-primary z-50 transition-all duration-400 ease-in-out pointer-events-none transform origin-center ${
          isTransitioning ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />

      {/* Main Container: Mobile/Tablet centered -> Desktop Asymmetric Split */}
      <div className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row relative z-10">
        {/* LEFT COLUMN: Narrative & Structural Controls Area */}
        <section className="w-full lg:w-[480px] bg-card border-b lg:border-b-0 lg:border-r border-border p-8 sm:p-12 lg:p-16 flex flex-col justify-between shrink-0 relative z-20 shadow-sm">
          {/* Brand Identity Identifier */}
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="w-10 h-10 rounded-input bg-primary flex items-center justify-center text-white">
              <Brain className="w-6 h-6 fill-current" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">
              RecallIQ
            </span>
          </div>

          {/* Central Context Engagement Frame */}
          <div className="w-full max-w-[360px] mx-auto flex flex-col gap-8 my-12 lg:my-auto items-center lg:items-start text-center lg:text-left">
            {/* Ambient Label Pill */}
            <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary border border-primary/10 px-4 py-1.5 rounded-pill font-label font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-primary/10" />
              Welcome to RecallIQ
            </div>

            {/* Typography Structural Layout */}
            <div className="space-y-4">
              <h1 className="font-heading font-bold text-4xl sm:text-[52px] leading-[1.1] tracking-tight text-text-primary">
                Stop forgetting what you learn.
              </h1>
              <p className="font-body font-normal text-text-secondary text-base sm:text-lg leading-relaxed">
                RecallIQ quizzes you at the perfect moment — right before you
                forget.
              </p>
            </div>

            {/* Core Action Call Trigger */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full sm:w-[360px] h-[52px] bg-primary hover:bg-primary-dark text-white font-label font-semibold text-sm rounded-large-card flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer group"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Step Sequence Status Tracks */}
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <div className="h-2 w-6 bg-primary rounded-pill transition-all duration-300" />
            <div className="h-2 w-2 bg-border rounded-pill transition-all duration-300" />
            <div className="h-2 w-2 bg-border rounded-pill transition-all duration-300" />
          </div>
        </section>

        {/* RIGHT COLUMN: Large-Scale Visualization (Hidden on Mobile/Tablet viewports) */}
        <section className="hidden lg:flex flex-1 bg-primary-light items-center justify-center p-12 relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

          {/* Dynamic background blur accents */}
          <div className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />

          {/* Clean High-Fidelity SVG Brain Architecture Graphic */}
          <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center transition-transform duration-700 hover:scale-102">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Brain Base Left Hemispheric Structures */}
              <path
                d="M100,50 C60,50 40,70 40,105 C40,135 60,150 85,150 C90,150 95,147 100,145"
                fill="none"
                stroke="#5C51E8"
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-90"
              />
              {/* Brain Base Right Hemispheric Structures */}
              <path
                d="M100,50 C140,50 160,70 160,105 C160,135 140,150 115,150 C110,150 105,147 100,145"
                fill="none"
                stroke="#1D9E75"
                strokeWidth="12"
                strokeLinecap="round"
                className="opacity-90"
              />
              {/* Internal Cerebellar Folding Geometry */}
              <path
                d="M65,95 C65,115 85,115 100,110"
                fill="none"
                stroke="#5C51E8"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M135,95 C135,115 115,115 100,110"
                fill="none"
                stroke="#1D9E75"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M75,75 C85,85 95,80 100,85"
                fill="none"
                stroke="#5C51E8"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M125,75 C115,85 105,80 100,85"
                fill="none"
                stroke="#1D9E75"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Central Synaptic Cognitive Lightning Spike */}
              <path
                d="M100,20 L115,55 L95,55 L105,85"
                fill="none"
                stroke="#BA7517"
                strokeWidth="8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Peripheral Neural Discharge Accents */}
              <line
                x1="100"
                y1="10"
                x2="100"
                y2="15"
                stroke="#BA7517"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="120"
                y1="22"
                x2="115"
                y2="27"
                stroke="#BA7517"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="80"
                y1="22"
                x2="85"
                y2="27"
                stroke="#BA7517"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
