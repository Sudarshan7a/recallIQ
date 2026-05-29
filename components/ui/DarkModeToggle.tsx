'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export default function DarkModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const current = theme === 'system' ? systemTheme : theme

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-transparent text-text-secondary hover:text-text-primary"
    >
      {current === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}
