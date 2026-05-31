"use client";

import { useState } from "react";
import {
  AlertTriangle,
  History,
  Home,
  Layers,
  Search,
  Plus,
  Settings,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function AddContentPage() {
  // We'll default to 'error' so you can instantly see the state from your mockup.
  // Change to 'idle' to test the standard input flow.
  const [status, setStatus] = useState<"idle" | "waiting" | "error">("error");
  const [content, setContent] = useState(
    "SSL stands for Secure Socket Layer...",
  );

  const handleGenerate = () => {
    if (!content.trim()) return;
    setStatus("waiting");

    // Simulating a network failure after 2 seconds to trigger the error state
    setTimeout(() => {
      setStatus("error");
    }, 2000);
  };

  return (
    <div className="bg-surface md:bg-background min-h-screen font-body text-text-primary antialiased flex flex-col md:pb-0 pb-24">
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-border flex items-center justify-between px-6 h-16">
        {/* Mapped to "Clash Display, 22px" per your spec */}
        <h1 className="font-heading font-bold text-[22px] text-text-primary tracking-tight">
          Add content
        </h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-card transition-colors text-text-secondary active:scale-95">
          <History className="w-6 h-6" />
        </button>
      </header>

      {/* 2. MAIN CANVAS */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-6 flex flex-col gap-4">
        {/* INPUT / CONTENT CARD */}
        {status === "idle" ? (
          <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your notes here..."
              className="w-full h-48 bg-card border border-border rounded-large-card p-5 font-body text-lg text-text-primary placeholder:text-text-secondary/50 focus:ring-2 focus:ring-primary/20 outline-none resize-none shadow-sm transition-all"
            />
            <button
              onClick={handleGenerate}
              disabled={!content.trim()}
              className="w-full py-4 bg-primary hover:bg-primary-dark disabled:bg-text-secondary/20 disabled:text-text-secondary text-white font-label font-bold text-base rounded-card shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Generate Cards
            </button>
          </div>
        ) : (
          /* READONLY CONTENT CARD (Used in Error/Waiting states) */
          <div className="bg-card border border-border rounded-large-card p-5 shadow-sm">
            <p className="font-body text-[18px] leading-relaxed text-text-primary line-clamp-3">
              {content}
            </p>
          </div>
        )}

        {/* ========================================== */}
        {/* STATE: ERROR (Matches the provided mockup) */}
        {/* ========================================== */}
        {status === "error" && (
          <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-300">
            {/* Error Banner */}
            <div className="bg-error-light border border-error/20 rounded-large-card p-5 mt-2 shadow-sm">
              <h3 className="flex items-center gap-2 font-heading font-bold text-xl text-error mb-2">
                <AlertTriangle className="w-6 h-6 shrink-0" strokeWidth={2.5} />
                The AI ran into a hiccup.
              </h3>
              <p className="font-body font-normal text-[15px] text-error-dark leading-relaxed">
                We lost connection to the AI server. Your work is safe, but we
                couldn&apos;t generate the content at this time.
              </p>
            </div>

            {/* Error Actions */}
            <div className="mt-2 flex flex-col gap-3">
              <button
                onClick={handleGenerate}
                className="w-full py-4 bg-error hover:bg-error-dark text-white rounded-card font-label font-bold text-base shadow-sm transition-all active:scale-[0.98]"
              >
                Try generating again
              </button>
              <button
                onClick={() => setStatus("idle")}
                className="w-full py-4 bg-card hover:bg-background border border-error/40 text-error rounded-card font-label font-bold text-base shadow-sm transition-all active:scale-[0.98]"
              >
                Edit your note
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* STATE: WAITING                             */}
        {/* ========================================== */}
        {status === "waiting" && (
          <div className="flex flex-col items-center gap-6 py-12 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center shadow-sm">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
            <p className="font-heading font-bold text-xl text-text-primary text-center">
              Analyzing your notes...
            </p>
          </div>
        )}
      </main>

      {/* 3. MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border h-20 flex items-center justify-around px-2 z-40 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-colors w-16">
          <Home className="w-6 h-6" />
          <span className="font-label font-semibold text-[10px]">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-colors w-16">
          <Layers className="w-6 h-6" />
          <span className="font-label font-semibold text-[10px]">Decks</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-colors w-16">
          <Search className="w-6 h-6" />
          <span className="font-label font-semibold text-[10px]">Search</span>
        </button>

        {/* Active Tab (Add) */}
        <button className="flex flex-col items-center gap-1 bg-primary-light text-primary py-1 px-4 rounded-xl transition-colors">
          <Plus className="w-6 h-6" strokeWidth={2.5} />
          <span className="font-label font-bold text-[10px]">Add</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary transition-colors w-16">
          <Settings className="w-6 h-6" />
          <span className="font-label font-semibold text-[10px]">Settings</span>
        </button>
      </nav>
    </div>
  );
}
