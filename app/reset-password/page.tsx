"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Key,
  Eye,
  EyeOff,
  Brain,
  Users,
  Star,
  TrendingUp,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: form.get("token"),
          newPassword: form.get("newPassword"),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to reset password. Please check your code.");
      }

      setMessage("Password reset successfully. Redirecting to login...");
      
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password.");
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
              New Password
            </h1>
            <p className="text-sm font-body font-normal text-text-secondary">
              Enter your 6-digit OTP code and choose a new password.
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
              <div className="bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/20 p-3 rounded-input text-xs font-body flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1D9E75]" /> {message}
              </div>
            )}

            {/* OTP Token Block */}
            <div className="space-y-1">
              <label
                className="block font-label font-semibold text-xs text-text-primary"
                htmlFor="token"
              >
                6-Digit Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  id="token"
                  type="text"
                  name="token"
                  maxLength={6}
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-input text-sm font-body text-text-primary tracking-widest font-semibold placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="123456"
                />
              </div>
            </div>

            {/* New Password Block */}
            <div className="space-y-1">
              <label
                className="block font-label font-semibold text-xs text-text-primary"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-input text-sm font-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
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
                  Resetting password...
                </>
              ) : (
                "Reset Password"
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
