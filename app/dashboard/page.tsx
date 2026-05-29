"use client"

import React from 'react'
import Card from '../../components/ui/Card'
import DeckCard from '../../components/ui/DeckCard'
import Button from '../../components/ui/Button'

const mockDecks = [
  { title: 'Biology', progress: 72, count: 120 },
  { title: 'Spanish', progress: 34, count: 56 },
  { title: 'Algorithms', progress: 48, count: 88 },
  { title: 'History', progress: 12, count: 20 },
]

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-text-primary">Welcome back</h1>
        <p className="text-text-secondary text-sm mt-1">You're making great progress — keep it up.</p>
      </header>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-6">
        <Card className="p-4">
          <h3 className="text-sm text-text-secondary">Due Cards</h3>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold text-text-primary">24</div>
              <div className="text-xs text-text-secondary">due today</div>
            </div>
            <Button variant="primary">Start Review</Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-text-secondary">Streak</h3>
          <div className="mt-3">
            <div className="text-2xl font-semibold text-text-primary">12</div>
            <div className="text-xs text-text-secondary">days in a row</div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm text-text-secondary">XP</h3>
          <div className="mt-3">
            <div className="text-2xl font-semibold text-text-primary">3,420</div>
            <div className="text-xs text-text-secondary">total points</div>
          </div>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-text-primary">Recent decks</h2>
          <Button variant="ghost">See all</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockDecks.map((d) => (
            <DeckCard key={d.title} title={d.title} progress={d.progress} count={d.count} />
          ))}
        </div>
      </section>
    </div>
  )
}
