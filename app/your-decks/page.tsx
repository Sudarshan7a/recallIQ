"use client"

import React from 'react'
import EmptyState from '../../components/ui/EmptyState'
import Button from '../../components/ui/Button'

export default function YourDecksPage() {
  const hasDecks = false // mock

  if (!hasDecks) {
    return (
      <div className="max-w-4xl mx-auto">
        <EmptyState
          title="No decks yet"
          description="Create your first deck to start studying and track your progress."
          action={<Button variant="primary">Create deck</Button>}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-display font-semibold mb-4">Your decks</h1>
      {/* populated state would go here */}
    </div>
  )
}
