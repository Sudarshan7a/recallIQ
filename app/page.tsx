"use client";

import Link from "next/link";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-main font-sans">
      <header className="flex items-center justify-between px-6 py-4 mx-auto w-full max-w-6xl">
        <div className="flex items-center gap-2">
          {/* Simple logo placeholder */}
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="font-display font-bold text-xl text-text-primary">RecallIQ</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-text-secondary hover:text-text-primary font-medium text-sm transition-colors">
            Log in
          </Link>
          <Link href="/signup">
            <Button variant="primary">
              Sign up
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-24 pb-16 px-6">
        <div className="max-w-3xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight tracking-tight">
            Master anything, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-info-500">
              faster than ever.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Upload your documents and let AI generate optimized flashcards. 
            Study smarter with spaced repetition and stay consistent with daily goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup">
               <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                 Get Started for Free
               </Button>
            </Link>
            <Link href="/login">
               <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg">
                 See how it works
               </Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Mock */}
        <div className="mt-32 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-surface-100 border border-border">
            <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Generation</h3>
            <p className="text-text-secondary leading-relaxed">Instantly transform any text, PDF, or video transcript into a comprehensive deck of flashcards.</p>
          </div>
          <div className="p-8 rounded-3xl bg-surface-100 border border-border">
            <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center mb-6">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Spaced Repetition</h3>
            <p className="text-text-secondary leading-relaxed">Our advanced algorithm schedules reviews exactly when you need them, ensuring long-term retention.</p>
          </div>
          <div className="p-8 rounded-3xl bg-surface-100 border border-border">
            <div className="w-12 h-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center mb-6">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Keep Your Streak</h3>
            <p className="text-text-secondary leading-relaxed">Stay motivated with daily goals, habit tracking, and detailed mastery insights on your progress.</p>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-text-secondary text-sm border-t border-border mt-auto">
        &copy; {new Date().getFullYear()} RecallIQ. All rights reserved.
      </footer>
    </div>
  );
}
