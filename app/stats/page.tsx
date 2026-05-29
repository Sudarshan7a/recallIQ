"use client"

import React from 'react'
import Card from '../../components/ui/Card'

export default function StatsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-text-primary">Stats</h1>
        <p className="text-text-secondary text-sm">Your learning progress at a glance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm text-text-secondary">Total review time</h3>
          <div className="mt-2 text-text-primary text-lg font-semibold">1h 24m</div>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-text-secondary">Cards mastered</h3>
          <div className="mt-2 text-text-primary text-lg font-semibold">520</div>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm text-text-secondary">Streak</h3>
          <div className="mt-2 text-text-primary text-lg font-semibold">12 days</div>
        </Card>
      </div>
    </div>
  )
}
