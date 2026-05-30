import React from 'react'
import Card from './Card'

export default function DailyInsight({ children }: { children?: React.ReactNode }) {
  return (
    <Card className="p-4 bg-surface-muted text-text-primary">
      <h4 className="text-sm font-medium">Daily Insight</h4>
      <p className="text-sm mt-2 text-text-secondary">{children ?? 'You retain information 23% better when studying between 8AM and 10AM.'}</p>
    </Card>
  )
}
