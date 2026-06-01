"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Shield, Bell, Key, CreditCard } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  plan?: string;
  createdAt?: string;
}

export default function SettingsClient() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. USER INFO LOADS ON MOUNT
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          throw new Error("Failed to retrieve user data. Please log in again.");
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to load user info:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  // 2. LOGOUT CLEARS TOKENS & REDIRECTS
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear client-side authentication tokens explicitly
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();

      // Clear standard secure HTTP cookies if your auth stack uses them
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Force push back to authentication root
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout execution failed:", error);
      // Fallback redirect even if fetch fails to make sure user isn't stuck
      router.replace("/login");
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8 animate-pulse">
        {/* Skeleton Header */}
        <div className="border-b border-border pb-6">
          <div className="h-8 bg-border rounded w-1/3 mb-2" />
          <div className="h-4 bg-border rounded w-2/3" />
        </div>
        
        {/* Skeleton Profile Card */}
        <div className="border border-border rounded-large-card p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-border shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-border/80 rounded w-1/4" />
            <div className="h-4 bg-border/80 rounded w-1/3" />
            <div className="h-5 bg-border/80 rounded-pill w-16" />
          </div>
        </div>

        {/* Skeleton Settings Options */}
        <div className="border border-border rounded-large-card divide-y divide-border overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className="w-5 h-5 bg-border rounded shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-border/80 rounded w-1/4" />
                <div className="h-3 bg-border/80 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-error-light text-error flex items-center justify-center">
          <Shield className="w-6 h-6" />
        </div>
        <h2 className="font-heading font-bold text-xl text-text-primary">Error Loading Settings</h2>
        <p className="font-body text-text-secondary text-sm max-w-md">{error}</p>
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-label font-bold text-sm rounded-card transition-all active:scale-[0.98] cursor-pointer"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* PAGE HEADER */}
      <div className="border-b border-border pb-6">
        <h1 className="font-heading font-bold text-3xl text-text-primary tracking-tight mb-1">
          Settings
        </h1>
        <p className="font-body font-normal text-text-secondary text-sm">
          Manage your account preferences and system parameters.
        </p>
      </div>

      {/* USER PROFILE CARD */}
      <div className="bg-card border border-border rounded-large-card p-6 shadow-sm flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0 border border-primary/10">
          <User className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-heading font-bold text-xl text-text-primary truncate">
            {user?.name}
          </h2>
          <p className="font-body font-normal text-xs text-text-secondary truncate mb-1">
            {user?.email}
          </p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-pill font-label font-bold text-[10px] uppercase bg-secondary-light text-secondary-dark border border-secondary/10">
            {user?.plan || "Free Plan"}
          </span>
        </div>
      </div>

      {/* SETTINGS OPTIONS GROUPS */}
      <div className="bg-card border border-border rounded-large-card overflow-hidden shadow-sm divide-y divide-border">
        <div className="p-4 hover:bg-background/50 transition-colors flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-4">
            <Key className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
            <div>
              <h3 className="font-label font-bold text-sm text-text-primary">
                Security & Credentials
              </h3>
              <p className="font-body font-normal text-xs text-text-secondary">
                Update passkeys and active dynamic sessions.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 hover:bg-background/50 transition-colors flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
            <div>
              <h3 className="font-label font-bold text-sm text-text-primary">
                Notifications
              </h3>
              <p className="font-body font-normal text-xs text-text-secondary">
                Configure automated queue intervals and alerts.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 hover:bg-background/50 transition-colors flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-4">
            <CreditCard className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
            <div>
              <h3 className="font-label font-bold text-sm text-text-primary">
                Billing
              </h3>
              <p className="font-body font-normal text-xs text-text-secondary">
                Review usage quotas and tier upgrades.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DESTRUCTIVE ZONE (LOGOUT) */}
      <div className="pt-4">
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-error-light hover:bg-error/10 border border-error/20 text-error font-label font-bold text-sm rounded-card shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Log out of account
        </button>
      </div>
    </div>
  );
}
