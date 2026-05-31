"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Shield, Bell, Key, CreditCard } from "lucide-react";

// Mocking your session loading. Replace with your actual auth hook (e.g., useAuth, next-auth, custom context)
const mockUser = {
  name: "Sudarshan",
  email: "sudarshan@example.com",
  plan: "Free Plan",
  joined: "May 2026",
};

export default function SettingsClient() {
  const router = useRouter();
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. USER INFO LOADS ON MOUNT
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        // Simulate minor network latency for hydration safety
        await new Promise((resolve) => setTimeout(resolve, 300));
        setUser(mockUser);
      } catch (error) {
        console.error("Failed to load user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  // 2. LOGOUT CLEARS TOKENS & REDIRECTS
  const handleLogout = async () => {
    try {
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
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-body text-text-secondary text-sm mt-4">
          Loading configurations...
        </p>
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
            {user?.plan}
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
