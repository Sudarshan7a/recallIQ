"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarNavProps {
  dueCount: number;
}

export function SidebarNav({ dueCount }: SidebarNavProps) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home, badge: dueCount > 0 ? dueCount : undefined },
    { href: "/dashboard/decks", label: "Decks", icon: Layers },
    { href: "/dashboard/stats", label: "Stats", icon: BarChart2 },
  ];

  return (
    <nav className="flex-1 flex flex-col gap-1 px-3.5 relative">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative flex items-center justify-between px-4 py-2.5 rounded-lg font-sans font-medium text-sm select-none transition-colors duration-200 ${
              isActive
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {/* Apple-like sliding background highlight */}
            {isActive && (
              <motion.span
                layoutId="sidebarActiveBackground"
                className="absolute inset-0 bg-black/[0.04] dark:bg-white/[0.04] rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}

            <div className="flex items-center gap-3">
              <Icon className={`w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-102 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-text-secondary group-hover:text-text-primary"}`} />
              <span>{link.label}</span>
            </div>

            {link.badge !== undefined && (
              <span className="bg-indigo-600 dark:bg-indigo-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {link.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
