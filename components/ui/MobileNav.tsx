"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, BarChart2, User } from "lucide-react";

interface MobileNavProps {
  dueCount: number;
}

export function MobileNav({ dueCount }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    {
      href: "/review",
      label: "Review",
      icon: Layers,
      badge: dueCount > 0 ? dueCount : undefined,
    },
    { href: "/dashboard/stats", label: "Stats", icon: BarChart2 },
    { href: "/dashboard/settings", label: "Profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-zinc-200/50 dark:border-zinc-800/50 h-16 flex items-center justify-around px-2 z-40 pb-safe shadow-[0_-1px_10px_rgba(0,0,0,0.015)]">
      {navItems.map((item) => {
        // Matches exact pathname or prefix for nested paths
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 relative text-center select-none active:scale-95 transition-transform"
          >
            <div className="relative flex items-center justify-center p-1.5 rounded-full">
              <Icon
                className={`w-5.5 h-5.5 transition-colors duration-200 ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 fill-indigo-600/10 dark:fill-indigo-400/10"
                    : "text-text-secondary"
                }`}
              />
              {item.badge !== undefined && (
                <span className="absolute -top-0.5 -right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-card shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`font-sans font-medium text-[9px] tracking-wide transition-colors duration-200 ${
                isActive ? "text-indigo-600 dark:text-indigo-400" : "text-text-secondary"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
