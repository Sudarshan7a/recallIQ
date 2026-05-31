"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Brain,
  Users,
  Star,
  TrendingUp,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex bg-background font-body text-text-primary selection:bg-primary-light selection:text-primary-dark">
      {/* Left Panel: High-Conversion Billboard (Hidden on Mobile/Tablet) */}
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
          {/* Mobile Display Identity (Hidden on Larger Real Estate viewports) */}
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
              Welcome back
            </h1>
            <p className="text-sm font-body font-normal text-text-secondary">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Core Interactive Presentation Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-error-light text-error border border-error/20 p-3 rounded-input text-xs font-body flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}

            {/* Account Entry Block */}
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
                  required
                  disabled={isLoading}
                  className="block w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-input text-sm font-body text-text-primary placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="student@university.edu"
                />
              </div>
            </div>

            {/* Verification Block */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  className="block font-label font-semibold text-xs text-text-primary"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="font-label font-semibold text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
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

            {/* Dynamic Submission Status Wrapper */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 bg-primary hover:bg-primary-dark disabled:bg-primary/70 text-white font-label font-semibold text-sm rounded-card shadow-sm transition-all active:scale-[0.99] disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Navigational Split Context Bridge */}
          <div className="mt-6 flex items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 mx-4 font-label font-semibold text-xs text-text-secondary uppercase tracking-wider">
              OR
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-body font-normal text-sm text-text-secondary">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-label font-semibold text-primary hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
