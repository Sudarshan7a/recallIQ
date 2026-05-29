"use client"

import React from 'react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

export default function ReviewCompletePage() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary">Session complete</h2>
        <p className="text-text-secondary mt-2">Nice work — you completed your review session.</p>
        <div className="mt-4">
          <div className="text-2xl font-semibold text-text-primary">18</div>
          <div className="text-text-secondary text-sm">cards reviewed</div>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="primary">Back to Dashboard</Button>
          <Button variant="ghost">Review again</Button>
        </div>
      </Card>
    </div>
  )
}
