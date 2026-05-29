"use client"

import React from 'react'
import EmptyState from '../../../components/ui/EmptyState'
import Button from '../../../components/ui/Button'

export default function StatsEmpty() {
  return (
    <div className="max-w-4xl mx-auto">
      <EmptyState
        title="No stats yet"
        description="Complete some reviews to populate your progress dashboard."
        action={<Button variant="primary">Start review</Button>}
      />
    </div>
  )
}
