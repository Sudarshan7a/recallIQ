"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../../components/ui/Card'
import DeckCard from '../../../components/ui/DeckCard'
import ProgressRing from '../../../components/ui/ProgressRing'

export default function DeckDetailPage({ params }: { params: { id: string } }) {
  const id = params.id
  // mock deck
  const deck = { id, title: `Deck ${id}`, progress: 62, count: 42 }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-text-primary">{deck.title}</h1>
          <p className="text-text-secondary text-sm">{deck.count} cards</p>
        </div>
        <div className="flex items-center gap-4">
          <ProgressRing progress={deck.progress} />
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4">
        <div className="flex gap-4">
          <DeckCard title={deck.title} progress={deck.progress} count={deck.count} />
        </div>

        <Card className="p-4">
          <h2 className="text-sm text-text-primary font-medium">Top cards</h2>
          <p className="text-text-secondary text-sm mt-2">Example list of cards (mock)</p>
        </Card>
      </section>
    </div>
  )
}
