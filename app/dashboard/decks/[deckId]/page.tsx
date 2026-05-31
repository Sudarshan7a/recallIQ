"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MoreVertical,
  Folder,
  Plus,
  BookOpen,
  Shield,
} from "lucide-react";

export default function EmptyDeckDetailPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;
  const [cards] = useState([]); // Empty array triggers zero state card display

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* TOP ACTION BAR */}
      <header className="w-full bg-card border-b border-border sticky top-0 z-40 h-16 flex items-center justify-between px-6">
        <button
          onClick={() => router.push("/dashboard/decks")}
          className="text-primary hover:bg-background p-2 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-heading font-bold text-lg text-text-primary text-center flex-1">
          Deck Details
        </h1>
        <button className="text-text-secondary hover:bg-background p-2 rounded-full transition-colors">
          <MoreVertical className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 pt-6 space-y-6 pb-24">
        {/* PRIMARY BENTO HERO CARD HEADER */}
        <div className="bg-primary text-white rounded-large-card p-6 shadow-md relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Folder className="w-8 h-8 text-white fill-white/20" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-2xl text-white">
                  New Deck
                </h2>
                <p className="font-body font-normal text-xs text-primary-light/80 mt-1">
                  Created just now
                </p>
              </div>
            </div>

            {/* Circular Progress Ring Mock */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 self-stretch md:self-auto">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-white/20"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute font-heading font-bold text-sm text-white">
                  0%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label font-bold text-[10px] text-primary-light uppercase tracking-wider">
                  Mastery
                </span>
                <span className="font-body font-normal text-sm text-white">
                  0/0 Cards
                </span>
              </div>
            </div>
          </div>

          {/* Primary Quick Stats Row */}
          <div className="relative z-10 grid grid-cols-4 gap-2 mt-6 pt-6 border-t border-white/20 text-center">
            <div>
              <div className="font-heading font-bold text-xl text-white">0</div>
              <div className="font-label font-semibold text-[10px] text-primary-light uppercase tracking-wider">
                Total
              </div>
            </div>
            <div>
              <div className="font-heading font-bold text-xl text-white">0</div>
              <div className="font-label font-semibold text-[10px] text-primary-light uppercase tracking-wider">
                Due
              </div>
            </div>
            <div>
              <div className="font-heading font-bold text-xl text-white">0</div>
              <div className="font-label font-semibold text-[10px] text-primary-light uppercase tracking-wider">
                Weak
              </div>
            </div>
            <div>
              <div className="font-heading font-bold text-xl text-white">0</div>
              <div className="font-label font-semibold text-[10px] text-primary-light uppercase tracking-wider">
                Mastered
              </div>
            </div>
          </div>
        </div>

        {/* DOMAIN TYPE FILTERS TAB SECTION */}
        <div className="flex gap-6 border-b border-border overflow-x-auto no-scrollbar pb-1">
          <button className="font-label font-bold text-sm px-2 className pb-2 border-b-2 border-primary text-primary whitespace-nowrap">
            All
          </button>
          <button className="font-label font-bold text-sm px-2 className pb-2 border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            Core
          </button>
          <button className="font-label font-bold text-sm px-2 className pb-2 border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
            Good to know
          </button>
        </div>

        {/* INNER CARD LEVEL ZERO STATE GRAPHIC */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-[180px] h-[120px] border-2 border-dashed border-border rounded-large-card flex items-center justify-center bg-card mb-6 relative shadow-inner">
            <div className="absolute inset-0 bg-primary/5 rounded-large-card blur-md" />
            <Plus className="w-8 h-8 text-text-secondary relative z-10" />
          </div>
          <h3 className="font-heading font-bold text-lg text-text-primary mb-1">
            No cards yet
          </h3>
          <p className="font-body font-normal text-sm text-text-secondary max-w-[240px]">
            Add your first card to start building this deck
          </p>
        </div>
      </main>

      {/* ACTION DOCKED CONTROLS SYSTEM FOOTER FOOTPRINT */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4 gap-4">
          <button className="flex flex-col items-center justify-center text-text-secondary hover:text-primary transition-colors min-w-[56px]">
            <Shield className="w-5 h-5 mb-1" />
            <span className="font-label font-semibold text-[10px]">Exam</span>
          </button>
          <Link
            href={`/review/${deckId}`}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-label font-bold py-3.5 px-6 rounded-card flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <BookOpen className="w-4 h-4" /> Study deck
          </Link>
          <button className="flex flex-col items-center justify-center text-primary bg-primary-light/80 p-2 rounded-xl min-w-[56px] hover:bg-primary-light transition-colors">
            <Plus className="w-5 h-5 mb-1" strokeWidth={2.5} />
            <span className="font-label font-bold text-[10px]">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
