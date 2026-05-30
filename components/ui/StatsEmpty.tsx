import React from 'react'
import EmptyState from './EmptyState'
import Button from './Button'

export default function StatsEmpty() {
  return (
    <div className="max-w-4xl mx-auto">
      <EmptyState
        title="No stats yet"
        description="Start studying to populate your progress and insights."
        action={<Button variant="primary">Start studying</Button>}
      />
    </div>
  )
}
