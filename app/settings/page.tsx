"use client";

import React, { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

type Tab = "profile" | "preferences" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 py-8 px-4 h-full">
      <div className="w-full md:w-64 shrink-0">
        <h1 className="text-3xl font-display font-semibold text-text-primary mb-6">
          Settings
        </h1>
        <nav className="flex flex-col gap-1 space-y-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors ${
              activeTab === "profile"
                ? "bg-surface-200 text-text-primary"
                : "text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors ${
              activeTab === "preferences"
                ? "bg-surface-200 text-text-primary"
                : "text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors ${
              activeTab === "notifications"
                ? "bg-surface-200 text-text-primary"
                : "text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors ${
              activeTab === "security"
                ? "bg-surface-200 text-text-primary"
                : "text-text-secondary hover:bg-surface-100 hover:text-text-primary"
            }`}
          >
            Security
          </button>
        </nav>
      </div>

      <div className="flex-1 space-y-6">
        {activeTab === "profile" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                Profile
              </h2>
              <p className="text-text-secondary text-sm">
                Manage your public profile and personal details.
              </p>
            </div>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Alex Student"
                    className="w-full px-3 py-2 bg-surface-100 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    className="w-full px-3 py-2 bg-surface-100 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div className="pt-2">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div>
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                Preferences
              </h2>
              <p className="text-text-secondary text-sm">
                Customize your study experience and app appearance.
              </p>
            </div>
            <Card className="p-0 overflow-hidden divide-y divide-border">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-text-primary font-medium">Dark Mode</div>
                  <div className="text-text-secondary text-sm">
                    Switch between light and dark themes
                  </div>
                </div>
                <div className="w-12 h-6 bg-surface-300 rounded-full cursor-pointer relative transition-colors">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-text-primary font-medium">Auto-play audio</div>
                  <div className="text-text-secondary text-sm">
                    Play pronunciation automatically on card flip
                  </div>
                </div>
                <div className="w-12 h-6 bg-primary-500 rounded-full cursor-pointer relative transition-colors">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div>
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                Notifications
              </h2>
              <p className="text-text-secondary text-sm">
                Choose what updates you want to receive.
              </p>
            </div>
            <Card className="p-0 overflow-hidden divide-y divide-border">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-text-primary font-medium">Daily Reminders</div>
                  <div className="text-text-secondary text-sm">
                    Get a nudge to complete your daily review
                  </div>
                </div>
                <div className="w-12 h-6 bg-primary-500 rounded-full cursor-pointer relative transition-colors">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-text-primary font-medium">Streak Alerts</div>
                  <div className="text-text-secondary text-sm">
                    Warnings before you lose your streak
                  </div>
                </div>
                 <div className="w-12 h-6 bg-primary-500 rounded-full cursor-pointer relative transition-colors">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div>
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                Security
              </h2>
              <p className="text-text-secondary text-sm">
                Manage your password and account status.
              </p>
            </div>
            <Card className="p-6 space-y-4">
              <div>
                <Button variant="secondary" className="w-full sm:w-auto">Change Password</Button>
              </div>
            </Card>

            <div className="mt-12">
               <h3 className="text-error font-medium mb-4">Danger Zone</h3>
               <Card className="p-6 border-error/20 bg-error/5">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-text-primary font-medium">Delete Account</div>
                      <div className="text-text-secondary text-sm">
                        Permanently delete your account and all data. this cannot be undone.
                      </div>
                    </div>
                    <Button variant="ghost" className="text-error hover:bg-error/10 self-start sm:self-auto shrink-0">
                      Delete Account
                    </Button>
                 </div>
               </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
