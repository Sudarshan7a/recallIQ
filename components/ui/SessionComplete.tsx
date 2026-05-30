import React from 'react'
import Card from './Card'
import Button from './Button'

function StatTile({ value, label, accent }: { value: React.ReactNode; label: string; accent?: string }) {
  return (
    <div className="bg-surface-container rounded-lg p-4 w-36 text-center border border-gray-100">
      <div className={`text-2xl font-semibold ${accent ?? 'text-text-primary'}`}>{value}</div>
      <div className="text-xs text-text-secondary mt-1">{label}</div>
    </div>
  )
}

export default function SessionComplete({ stats }: { stats?: { cards: number; accuracy: number; xp: number; minutes: number } }) {
  const s = stats ?? { cards: 14, accuracy: 95, xp: 120, minutes: 12 }

  return (
    <div className="flex justify-center py-12">
      <Card className="p-8 max-w-3xl text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-amber-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 8H9L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-serif font-semibold mt-6">Session Complete!</h1>
        <p className="text-text-secondary mt-3">Outstanding focus. Your mastery is steadily improving with every session.</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <StatTile value={s.cards} label="CARDS" accent="text-indigo-600" />
          <StatTile value={`${s.accuracy}%`} label="ACCURACY" accent="text-emerald-600" />
          <StatTile value={`+${s.xp}`} label="XP EARNED" accent="text-amber-700" />
          <StatTile value={s.minutes} label="MIN" />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <Button variant="ghost">Share results</Button>
          <Button variant="primary">Back to Dashboard</Button>
        </div>
      </Card>
    </div>
  )
}
