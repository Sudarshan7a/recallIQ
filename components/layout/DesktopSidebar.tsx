'use client'

import React from 'react'
import Link from 'next/link'
import { Home, Zap, Plus, Layers, BarChart2, Settings } from 'lucide-react'

interface DesktopSidebarProps {
  dueCount?: number
  user?: { name: string; email: string }
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  dueCount = 0,
  user = { name: 'User Name', email: 'user@example.com' },
}) => {
  const nav = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/review', label: 'Review', icon: Zap },
    { href: '/add', label: 'Add', icon: Plus },
    { href: '/decks', label: 'Decks', icon: Layers },
    { href: '/stats', label: 'Stats', icon: BarChart2 },
  ]

  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U'

  return (
    <aside className="hidden xl:flex fixed left-0 top-0 bottom-0 w-[240px] h-screen bg-surface border-r border-border flex-col p-6 pt-8">
      <div className="flex items-center gap-2 pb-6 mb-4 border-b border-border">
        <div className="w-7 h-7 rounded-full bg-indigo flex items-center justify-center text-white font-semibold">R</div>
        <div className="flex items-baseline gap-1">
          <span className="text-text-primary font-display font-semibold text-lg">Recall</span>
          <span className="text-indigo font-display font-semibold text-lg">IQ</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {nav.map((n) => {
          const Icon = n.icon
          const isReview = n.href === '/review'
          return (
            <Link key={n.href} href={n.href} className="h-11 rounded-sm px-3 flex items-center gap-3 text-text-secondary hover:bg-background hover:text-text-primary">
              <div className="relative flex items-center">
                <Icon className="w-5 h-5" />
                {isReview && dueCount > 0 && <span className="absolute -right-2 -top-1 inline-block w-2 h-2 bg-red rounded-full" />}
              </div>
              <span className="text-sm">{n.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto flex items-center gap-3 pt-4">
        <div className="w-8 h-8 rounded-full bg-indigo flex items-center justify-center text-white font-display font-medium text-sm">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-text-primary text-sm font-medium truncate">{user.name}</div>
          <div className="text-text-secondary text-xs truncate">{user.email}</div>
        </div>
        <button aria-label="settings" className="text-text-secondary">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  )
}

export default DesktopSidebar
