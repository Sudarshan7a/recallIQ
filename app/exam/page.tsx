"use client"

import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function ExamPage() {
  const [started, setStarted] = useState(false)

  return (
    <div className="max-w-3xl mx-auto">
      {!started ? (
        <Card className="p-6 text-center">
          <h2 className="text-lg font-medium text-text-primary">Exam Mode</h2>
          <p className="text-text-secondary mt-2">Timed test-like review session to simulate recall under pressure.</p>
          <div className="mt-4">
            <Button variant="primary" onClick={() => setStarted(true)}>Start Exam</Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <h3 className="text-text-secondary">Exam in progress (mock)</h3>
          <div className="mt-4 text-text-primary font-medium">Question placeholder</div>
          <div className="mt-6 flex gap-3">
            <Button variant="ghost">I knew it</Button>
            <Button variant="secondary">I didn't know</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
