"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Terminal,
  Languages,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function DecksPage() {
  const router = useRouter();
  // Simulated database call. Leave empty to force the zero data state.
  const [decks] = useState([]);

  const isEmpty = decks.length === 0;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* HEADER & ZERO-STATE STATS BAR */}
      <div className="flex flex-col gap-6 border-b border-border pb-8">
        <div className="flex justify-between items-end">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
            Your decks
          </h1>
          <button className="text-primary hover:bg-primary-light p-2 rounded-full transition-colors">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Deactivated/Empty Stats Panel */}
        <div className="bg-card border border-border rounded-large-card shadow-sm p-6 flex justify-between divide-x divide-border opacity-60 pointer-events-none">
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
              Total cards
            </span>
            <span className="font-heading font-bold text-3xl mt-1">0</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
              Decks
            </span>
            <span className="font-heading font-bold text-3xl mt-1">0</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <span className="font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
              Avg mastery
            </span>
            <span className="font-heading font-bold text-3xl text-text-secondary mt-1">
              0%
            </span>
          </div>
        </div>
      </div>

      {/* SEARCH BAR & CHIPS (Deactivated View) */}
      <div className="flex flex-col gap-4 opacity-60 pointer-events-none">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            className="w-full bg-card border border-border rounded-input py-2 pl-10 pr-4 text-sm"
            disabled
            placeholder="Search decks..."
          />
        </div>
        <div className="flex gap-2">
          <span className="px-4 py-1.5 rounded-pill bg-primary text-white font-label font-semibold text-xs">
            All
          </span>
          <span className="px-4 py-1.5 rounded-pill bg-card border border-border text-text-secondary font-label font-semibold text-xs">
            Weak
          </span>
          <span className="px-4 py-1.5 rounded-pill bg-card border border-border text-text-secondary font-label font-semibold text-xs">
            Mastered
          </span>
        </div>
      </div>

      {/* CORE HERO EMPTY STATE CONTAINER */}
      {isEmpty && (
        <>
          <section className="flex flex-col items-center justify-center py-12 text-center px-4 rounded-large-card border border-dashed border-border bg-surface/50 shadow-inner">
            {/* Abstract Floating Card Stack Diagram */}
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
              <div className="absolute w-24 h-32 border-2 border-dashed border-border rounded-large-card transform rotate-12 translate-x-6 translate-y-2 bg-card" />
              <div className="absolute w-24 h-32 border-2 border-dashed border-primary-light rounded-large-card transform -rotate-6 -translate-x-4 -translate-y-2 bg-card" />
              <div className="absolute w-28 h-36 border border-primary-light rounded-large-card bg-primary text-white flex flex-col items-center justify-center shadow-md z-10">
                <Plus className="w-10 h-10 opacity-80" strokeWidth={2.5} />
              </div>
            </div>

            <h3 className="font-heading font-bold text-2xl text-text-primary mb-2 leading-tight">
              Your first deck is one thought away
            </h3>
            <p className="font-body font-normal text-sm text-text-secondary max-w-xs mb-8">
              Everything you learn can become a card. Build your personal
              library.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white font-label font-bold px-6 py-3.5 rounded-card shadow-sm flex items-center gap-2 transition-colors">
              Create your first deck
            </button>
          </section>

          {/* EXPLORE SAMPLE DECKS ROW */}
          <section className="pt-6 border-t border-border/60">
            <h4 className="font-heading font-bold text-base text-text-secondary mb-6 text-center">
              Or explore sample decks
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sample 1 */}
              <div className="bg-card border border-dashed border-primary/30 rounded-large-card p-6 flex flex-col items-center text-center hover:border-solid hover:border-primary cursor-pointer transition-all hover:shadow-md group">
                <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Terminal className="w-6 h-6" />
                </div>
                <h5 className="font-heading font-bold text-base text-text-primary mb-1">
                  CS 101 Basics
                </h5>
                <p className="font-body font-normal text-xs text-text-secondary">
                  Core programming concepts
                </p>
              </div>
              {/* Sample 2 */}
              <div className="bg-card border border-dashed border-tertiary/30 rounded-large-card p-6 flex flex-col items-center text-center hover:border-solid hover:border-tertiary cursor-pointer transition-all hover:shadow-md group">
                <div className="w-12 h-12 rounded-full bg-tertiary-light text-tertiary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Languages className="w-6 h-6" />
                </div>
                <h5 className="font-heading font-bold text-base text-text-primary mb-1">
                  Spanish Vocab
                </h5>
                <p className="font-body font-normal text-xs text-text-secondary">
                  Essential travel phrases
                </p>
              </div>
              {/* Sample 3 */}
              <div className="bg-card border border-dashed border-secondary/30 rounded-large-card p-6 flex flex-col items-center text-center hover:border-solid hover:border-secondary cursor-pointer transition-all hover:shadow-md group">
                <div className="w-12 h-12 rounded-full bg-secondary-light text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
                <h5 className="font-heading font-bold text-base text-text-primary mb-1">
                  Anatomy 101
                </h5>
                <p className="font-body font-normal text-xs text-text-secondary">
                  Skeletal system overview
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
