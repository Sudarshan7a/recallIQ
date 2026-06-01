"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Brain,
  Users,
  Star,
  TrendingUp,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const form = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to request password reset code.");
      }

      setMessage(payload.message ?? "If an account exists with that email, you will receive a reset code");
    } catch {
      // In security best practice we usually hide email verification, but if it is a JSON body parse error or network error, we can show it
      // However the prompt says: "On any response (success or email not found) show the same message"
      // So if it was successfully posted to the API (even if API returns some success message), we show the same target message.
      setMessage("If an account exists with that email, you will receive a reset code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex bg-background font-body text-text-primary selection:bg-primary-light selection:text-primary-dark">
      {/* Left Panel: High-Conversion Billboard */}
      <aside className="hidden lg:flex flex-col justify-between w-[560px] h-full bg-primary text-white p-10 relative z-10 shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05)_0%,transparent_40%)] pointer-events-none" />

        {/* Brand Header */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-input bg-white flex items-center justify-center text-primary">
              <Brain className="w-5 h-5 fill-current" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-white">
              RecallIQ
            </span>
          </div>
        </div>

        {/* Value Proposition Content */}
        <div className="space-y-8 my-auto">
          <h2 className="text-4xl font-heading font-bold leading-tight tracking-tight text-white">
            Master your curriculum faster.
          </h2>

          {/* Trust Metrics Grid */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-pill px-4 py-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-semibold font-label">
                2,400+ Students
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-pill px-4 py-2 flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold font-label">
                4.9 Rating
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-pill px-4 py-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold font-label">
                90% Retention
              </span>
            </div>
          </div>

          {/* User Advocacy Proof Block */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-card p-6 relative overflow-hidden">
            <p className="font-body font-normal text-base text-white/90 italic leading-relaxed mb-4">
              &quot;RecallIQ completely transformed my med school prep. The
              spaced repetition algorithms feel like they actually understand
              how my brain works. I&apos;m retaining twice as much in half the
              time.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-pill bg-white/20 flex items-center justify-center font-label font-semibold text-xs">
                SJ
              </div>
              <div>
                <div className="font-label font-semibold text-sm text-white">
                  Sarah Jenkins
                </div>
                <div className="font-body font-normal text-xs text-white/70">
                  M2 Student, Johns Hopkins
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copy Indicator */}
        <div className="font-label font-semibold text-xs text-white/60">
          &copy; {new Date().getFullYear()} RecallIQ. All rights reserved.
        </div>
      </aside>

      {/* Right Panel: Focused Input Frame Area */}
      <main className="flex-1 h-full flex items-center justify-center p-6 lg:p-10 overflow-y-auto bg-background relative">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[440px] bg-card rounded-large-card border border-border shadow-sm p-8">
          {/* Mobile Display Identity */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-input bg-primary flex items-center justify-center text-white">
              <Brain className="w-5 h-5 fill-current" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">
              Recall<span className="text-primary">IQ</span>
            </span>
          </div>

          {/* Context Messaging Block */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-1">
              Reset Password
            </h1>
            <p className="text-sm font-body font-normal text-text-secondary">
              Enter your email and we will send you a 6-digit verification code.
            </p>
          </div>

          {/* Core Interactive Presentation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-error-light text-error border border-error/20 p-3 rounded-input text-xs font-body flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}

            {message && (
              <div className="bg-secondary-light text-secondary-dark border border-secondary/20 p-4 rounded-input text-xs font-body flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                <span>{message}</span>
              </div>
            )}

            {/* Email Input Block */}
            <div className="space-y-1">
              <label
                className="block font-label font-semibold text-xs text-text-primary"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-input text-sm font-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="student@university.edu"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 bg-primary hover:bg-primary-dark disabled:bg-primary/70 text-white font-label font-semibold text-sm rounded-card shadow-sm transition-all active:scale-[0.99] disabled:pointer-events-none cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending code...
                </>
              ) : (
                "Send Reset Code"
              )}
            </button>
          </form>

          {/* Links back to login */}
          <div className="mt-8 text-center border-t border-border pt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 font-label font-semibold text-sm text-primary hover:underline transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
