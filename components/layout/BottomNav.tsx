'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Zap, Plus, Layers } from 'lucide-react'

interface BottomNavProps {
  dueCount?: number
}

export const BottomNav: React.FC<BottomNavProps> = ({ dueCount = 0 }) => {
  const pathname = usePathname() || '/'

  const tabs = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/review', label: 'Review', icon: Zap },
    { href: '/add', label: 'Add', icon: Plus },
    { href: '/decks', label: 'Decks', icon: Layers },
  ]

  return (
    <nav className="block xl:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex justify-around items-center z-50">
      {tabs.map((t) => {
        const active = pathname === t.href
        const Icon = t.icon
        const isReview = t.href === '/review'
        return (
          <Link key={t.href} href={t.href} className="flex-1 flex justify-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="relative">
                <Icon
                  className={`w-6 h-6 ${active ? 'text-indigo stroke-indigo' : 'text-text-secondary'}`}
                  aria-hidden
                />
                {isReview && dueCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-[11px] text-white bg-red rounded-full">
                    {dueCount > 99 ? '99+' : dueCount}
                  </span>
                )}
              </div>
              <span className={`text-[11px] ${active ? 'text-indigo' : 'text-text-secondary'}`}>{t.label}</span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
