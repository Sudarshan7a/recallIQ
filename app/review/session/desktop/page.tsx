"use client"

import React from 'react'
import Card from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'
import ProgressRing from '../../../../components/ui/ProgressRing'

export default function ReviewSessionDesktop() {
  return (
    <div className="max-w-6xl mx-auto flex gap-6 items-start">
      <aside className="w-80">
        <Card className="p-4">
          <h4 className="text-sm text-text-secondary">Session</h4>
          <div className="mt-3">
            <div className="text-2xl font-semibold">12</div>
            <div className="text-xs text-text-secondary">cards left</div>
          </div>
        </Card>
      </aside>

      <main className="flex-1">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold">What is the capital of France?</h2>
            <ProgressRing progress={60} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="ghost">Paris</Button>
            <Button variant="ghost">Lyon</Button>
            <Button variant="ghost">Marseille</Button>
            <Button variant="ghost">Bordeaux</Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
