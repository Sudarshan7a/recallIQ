"use client"

import React from 'react'
import DeckCard from '../../components/ui/DeckCard'

const mockDecks = [
  { title: 'Biology', progress: 72, count: 120 },
  { title: 'Spanish', progress: 34, count: 56 },
  { title: 'Algorithms', progress: 48, count: 88 },
  { title: 'History', progress: 12, count: 20 },
  { title: 'Chemistry', progress: 90, count: 140 },
  { title: 'Philosophy', progress: 5, count: 18 },
]

export default function DecksPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-display font-semibold text-text-primary">Your Decks</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockDecks.map((d) => (
          <DeckCard key={d.title} title={d.title} progress={d.progress} count={d.count} />
        ))}
      </div>
    </div>
  )
}
