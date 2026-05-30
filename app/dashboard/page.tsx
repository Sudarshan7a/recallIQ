"use client"

import React from 'react'
import Card from '../../components/ui/Card'
import DeckCard from '../../components/ui/DeckCard'
import Button from '../../components/ui/Button'
import DashboardEmpty from '../../components/ui/DashboardEmpty'
import DashboardHero from '../../components/ui/DashboardHero'
import DailyInsight from '../../components/ui/DailyInsight'
import ConsistencyHeatmap from '../../components/ui/ConsistencyHeatmap'
import DeckMastery from '../../components/ui/DeckMastery'

const mockDecks = [
  { title: 'Biology', progress: 72, count: 120 },
  { title: 'Spanish', progress: 34, count: 56 },
  { title: 'Algorithms', progress: 48, count: 88 },
  { title: 'History', progress: 12, count: 20 },
]

export default function DashboardPage() {
  const isEmpty = false // toggle to preview empty state

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto">
        <DashboardEmpty />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-text-primary">Welcome back</h1>
        <p className="text-text-secondary text-sm mt-1">You're making great progress — keep it up.</p>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          <div className="mt-4">
            <DashboardHero due={142} />
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-text-primary">Recent decks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
              {mockDecks.map((d) => (
                <DeckCard key={d.title} title={d.title} progress={d.progress} count={d.count} />
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-4">
          <ConsistencyHeatmap />
          <DeckMastery />
          <DailyInsight />
        </aside>
      </section>
    </div>
  )
}
