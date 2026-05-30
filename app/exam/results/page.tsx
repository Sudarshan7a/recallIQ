"use client";

import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import { CheckCircle2, XCircle, Clock, Trophy } from "lucide-react";

export default function ExamResultsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-text-primary mb-3">Exam Complete!</h1>
        <p className="text-text-secondary text-lg">Biology 101 Midterm Prep</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Score Card */}
        <Card className="p-8 flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-surface-200" strokeWidth="10" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-success" strokeWidth="10" strokeDasharray={`${85 * 2.827} 282.7`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-display font-bold text-text-primary">85%</span>
                    <span className="text-sm text-text-secondary mt-1">Score</span>
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Great job!</h2>
            <p className="text-text-secondary">You mastered most of the material. A quick review of the missed cards and you'll be perfect.</p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
             <Card className="p-6 flex flex-col items-center justify-center text-center bg-success/5 border-success/20">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div className="text-3xl font-display font-bold text-text-primary mb-1">42</div>
                <div className="text-sm text-text-secondary">Correct</div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center text-center bg-error/5 border-error/20">
                <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-3">
                    <XCircle className="w-6 h-6 text-error" />
                </div>
                <div className="text-3xl font-display font-bold text-text-primary mb-1">8</div>
                <div className="text-sm text-text-secondary">Incorrect</div>
            </Card>
            <Card className="p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-surface-200 flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-text-secondary" />
                </div>
                <div className="text-2xl font-display font-bold text-text-primary mb-1">14m 20s</div>
                <div className="text-sm text-text-secondary">Time Taken</div>
            </Card>
             <Card className="p-6 flex flex-col items-center justify-center text-center bg-primary-500/5 border-primary-500/20">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mb-3">
                    <Trophy className="w-6 h-6 text-primary-500" />
                </div>
                <div className="text-2xl font-display font-bold text-text-primary mb-1">+450</div>
                <div className="text-sm text-text-secondary">XP Gained</div>
            </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/dashboard" className="w-full sm:w-auto">
           <Button variant="secondary" className="w-full">Back to Dashboard</Button>
        </Link>
        <Link href="/review/session/desktop" className="w-full sm:w-auto">
           <Button variant="primary" className="w-full">Review Incorrect (8)</Button>
        </Link>
      </div>
    </div>
  );
}
