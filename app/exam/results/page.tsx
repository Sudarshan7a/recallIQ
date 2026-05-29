"use client"

import React from 'react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

export default function ExamResultsPage() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary">Exam results</h2>
        <p className="text-text-secondary mt-2">Summary of your exam (mock data)</p>
        <div className="mt-4 text-2xl font-semibold">78%</div>
        <div className="text-text-secondary">accuracy</div>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="primary">Back to Dashboard</Button>
          <Button variant="ghost">Review incorrect</Button>
        </div>
      </Card>
    </div>
  )
}
