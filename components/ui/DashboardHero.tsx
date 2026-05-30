import React from 'react'
import Card from './Card'
import Button from './Button'

export default function DashboardHero({ due = 0 }: { due?: number }) {
  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-sm opacity-90">Up Next for Review</h3>
          <p className="text-xs opacity-90">Optimized by spaced repetition</p>
          <div className="text-6xl font-serif font-medium mt-4">{due}</div>
          <div className="text-sm opacity-90">CARDS DUE</div>
          <div className="mt-6">
            <Button variant="primary">Start Session</Button>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <div className="w-40 h-28 bg-white/10 rounded-lg flex items-center justify-center">
            {/* decorative card stack */}
            <div className="w-24 h-16 bg-white/20 rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  )
}
