"use client"

import React, { useState } from 'react'
import ReviewCard from '../../../../components/ui/ReviewCard'
import Card from '../../../../components/ui/Card'

const mockCards = [
  { id: 1, front: 'What is spaced repetition?', back: 'A learning technique...' },
  { id: 2, front: 'Define active recall', back: 'Attempting to remember...' },
  { id: 3, front: 'What is Anki?', back: 'A spaced repetition app' },
]

export default function ReviewSessionTablet() {
  const [index, setIndex] = useState(0)
  const card = mockCards[index]

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-12 gap-6 items-start">
      <main className="col-span-12 md:col-span-8">
        <h2 className="text-lg font-medium text-text-primary mb-4">Review Session</h2>
        <ReviewCard card={card} onRate={() => setIndex(i=>Math.min(i+1,mockCards.length-1))} onSkip={() => setIndex(i=>Math.min(i+1,mockCards.length-1))} />
      </main>

      <aside className="col-span-12 md:col-span-4">
        <Card className="p-4">
          <h4 className="text-sm text-text-secondary">Session overview</h4>
          <div className="mt-3">
            <div className="text-2xl font-semibold">{mockCards.length - index}</div>
            <div className="text-xs text-text-secondary">cards left</div>
          </div>
        </Card>
      </aside>
    </div>
  )
}
