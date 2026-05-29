"use client"

import './globals.css'
import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import DesktopSidebar from '../components/layout/DesktopSidebar'
import BottomNav from '../components/layout/BottomNav'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DesktopSidebar />
          <main className="min-h-screen bg-background pb-16 xl:pb-0 xl:ml-[240px] px-4 md:px-6 xl:px-10 py-6 xl:py-10">
            {children}
          </main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
