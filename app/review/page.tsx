"use client"

import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { motion } from 'framer-motion'

const mockCards = [
  { id: 1, front: 'What is spaced repetition?', back: 'A learning technique...' },
  { id: 2, front: 'Define active recall', back: 'Attempting to remember...' },
  { id: 3, front: 'What is Anki?', back: 'A spaced repetition app' },
]

export default function ReviewPage() {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)

  const card = mockCards[index]

  return (
    <div className="max-w-3xl mx-auto">
      {!started ? (
        <Card className="p-6 text-center">
          <h2 className="text-lg font-medium text-text-primary">Start review session</h2>
          <p className="text-text-secondary mt-2">You have {mockCards.length} cards ready for review.</p>
          <div className="mt-4">
            <Button variant="primary" onClick={() => setStarted(true)}>
              Start Session
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-6">
              <div>
                <div className="text-sm text-text-secondary">Card {index + 1} of {mockCards.length}</div>
                <div className="mt-4 text-text-primary text-lg font-medium">{card.front}</div>
                {showBack && <div className="mt-4 text-text-secondary">{card.back}</div>}
              </div>
            </Card>
          </motion.div>

          <div className="flex gap-3">
            {!showBack ? (
              <Button variant="secondary" onClick={() => setShowBack(true)}>Show Answer</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => { setIndex((i) => Math.min(i + 1, mockCards.length - 1)); setShowBack(false); }}>
                  Mark Done
                </Button>
                <Button variant="primary" onClick={() => { setIndex((i) => Math.min(i + 1, mockCards.length - 1)); setShowBack(false); }}>
                  Next
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
