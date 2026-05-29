"use client"

import React, { useState } from 'react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import { motion } from 'framer-motion'

const mockCards = [
  { id: 1, front: 'What is spaced repetition?', back: 'A learning technique...' },
  { id: 2, front: 'Define active recall', back: 'Attempting to remember...' },
  { id: 3, front: 'What is Anki?', back: 'A spaced repetition app' },
  { id: 4, front: 'What is Leitner system?', back: 'A flashcard scheduling method' },
]

export default function ReviewSessionPage() {
  const [index, setIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)

  const card = mockCards[index]

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-4">
        <h2 className="text-lg font-medium text-text-primary">Review Session</h2>
        <p className="text-text-secondary text-sm">Focus mode — work through your due cards.</p>
      </header>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-6">
          <div className="text-sm text-text-secondary">Card {index + 1} / {mockCards.length}</div>
          <div className="mt-4 text-text-primary text-lg font-medium">{card.front}</div>
          {showBack && <div className="mt-4 text-text-secondary">{card.back}</div>}
        </Card>
      </motion.div>

      <div className="mt-4 flex gap-3">
        {!showBack ? (
          <Button variant="secondary" onClick={() => setShowBack(true)}>Show Answer</Button>
        ) : (
          <>
            <Button variant="ghost" onClick={() => { setIndex((i) => Math.max(0, i - 1)); setShowBack(false); }}>Previous</Button>
            <Button variant="primary" onClick={() => { setIndex((i) => Math.min(i + 1, mockCards.length - 1)); setShowBack(false); }}>Next</Button>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="ghost">Abandon</Button>
        <Button variant="secondary">Finish Session</Button>
      </div>
    </div>
  )
}
