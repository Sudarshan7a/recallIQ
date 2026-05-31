"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  Brain,
  Flame,
  ShieldAlert,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const form = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "We could not create your account.");
      }

      router.push("/onboarding");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not create your account.");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex bg-background font-body text-text-primary selection:bg-primary-light selection:text-primary-dark">
      {/* Left Panel: High Performance Utilities Billboard */}
      <aside className="hidden md:flex flex-col w-[560px] bg-primary text-white p-10 justify-between h-full relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-[800px] h-[800px] bg-white opacity-5 rounded-full pointer-events-none blur-3xl" />

        <div className="z-10 mt-4">
          <h1 className="font-heading font-bold text-2xl tracking-tight text-white mb-16">
            RecallIQ
          </h1>

          <div className="space-y-8">
            <h2 className="font-heading font-bold text-3xl text-white max-w-sm leading-tight">
              Cognitive efficiency for high-performance learning.
            </h2>

            {/* Modular Core Features List Area */}
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-input bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-label font-semibold text-sm text-white mb-0.5">
                    AI Card Generation
                  </h3>
                  <p className="font-body font-normal text-xs text-white/80 max-w-xs">
                    Instantly transform your notes into highly effective
                    flashcards using our context-aware AI.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-input bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-label font-semibold text-sm text-white mb-0.5">
                    FSRS Algorithm
                  </h3>
                  <p className="font-body font-normal text-xs text-white/80 max-w-xs">
                    Experience optimal knowledge retention with the advanced
                    Free Spaced Repetition Scheduler.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-input bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-label font-semibold text-sm text-white mb-0.5">
                    Importance Flags
                  </h3>
                  <p className="font-body font-normal text-xs text-white/80 max-w-xs">
                    Prioritize your review sessions by flagging critical
                    concepts that require immediate mastery.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-input bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-white">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-label font-semibold text-sm text-white mb-0.5">
                    Streak Tracking
                  </h3>
                  <p className="font-body font-normal text-xs text-white/80 max-w-xs">
                    Maintain momentum and build unbreakable study habits with
                    daily visual progress metrics.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="z-10 font-label font-semibold text-xs text-white/60">
          &copy; {new Date().getFullYear()} RecallIQ. All rights reserved.
        </div>
      </aside>

      {/* Right Panel: Registration Form Frame Content */}
      <main className="flex-1 bg-background flex flex-col justify-center items-center p-6 md:p-10 h-full overflow-y-auto">
        <div className="md:hidden w-full max-w-[480px] mb-6 text-center">
          <h1 className="font-heading font-bold text-3xl text-primary">
            RecallIQ
          </h1>
        </div>

        {/* Form Container Wrapper */}
        <div className="w-full max-w-[480px] bg-card rounded-large-card border border-border shadow-sm p-8">
          <div className="mb-6 text-center md:text-left">
            <h2 className="font-heading font-bold text-xl text-text-primary mb-1">
              Create an account
            </h2>
            <p className="font-body font-normal text-sm text-text-secondary">
              Start your journey to cognitive efficiency today.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-error-light text-error border border-error/20 p-3 rounded-input text-xs font-body flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}
            {/* Identity Field Mapping Component */}
            <div className="space-y-1">
              <label
                className="block font-label font-semibold text-xs text-text-primary"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-input text-sm font-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field Mapping Component */}
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
                  className="block w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-input text-sm font-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field Mapping Component */}
            <div className="space-y-1">
              <label
                className="block font-label font-semibold text-xs text-text-primary"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  disabled={isLoading}
                  minLength={8}
                  className="block w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-input text-sm font-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="font-body font-normal text-[11px] text-text-secondary mt-1">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Process Submission Trigger Wrapper */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/70 text-white font-label font-semibold text-sm py-3 px-4 rounded-card transition-all active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm disabled:pointer-events-none"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{isLoading ? "Creating account..." : "Sign Up"}</span>
              </button>
            </div>
          </form>

          {/* Social Sign-in Split Divider Block */}
          <div className="mt-6 relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-card font-body font-normal text-xs text-text-secondary">
                Or continue with
              </span>
            </div>
          </div>

          {/* Native High-Utility Social Providers Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded-input bg-card hover:bg-background text-text-primary font-label font-semibold text-sm transition-colors shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded-input bg-card hover:bg-background text-text-primary font-label font-semibold text-sm transition-colors shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
              GitHub
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body font-normal text-sm text-text-secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-label font-semibold text-primary hover:underline transition-all"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
