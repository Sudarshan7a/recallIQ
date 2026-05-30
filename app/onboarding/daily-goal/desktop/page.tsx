"use client"

import React from 'react'
import Card from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'
import OnboardingTransition from '../../../../components/ui/OnboardingTransition'

const goals = [5,10,15,30,60]

export default function DailyGoalDesktop() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-12 gap-8 items-center">
        <main className="col-span-12 lg:col-span-7">
          <OnboardingTransition>
            <h1 className="text-3xl font-display font-bold mb-3">Daily study goal</h1>
            <p className="text-text-secondary mb-6">Choose a daily study duration that fits your routine. We'll recommend a center option.</p>

            <div className="grid grid-cols-3 gap-4">
              {goals.map((g, i) => (
                <Card key={g} className={`p-6 h-[160px] ${i===2 ? 'scale-105 border-2 border-primary' : ''}`}>
                  <div className="text-center">
                    <div className="text-2xl font-semibold">{g} min</div>
                    <div className="text-sm text-text-secondary mt-2">per day</div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="primary">Finish</Button>
              <Button variant="ghost">Back</Button>
            </div>
          </OnboardingTransition>
        </main>

        <aside className="hidden lg:flex col-span-5 items-center justify-center">
          <div className="w-full max-w-sm">
            <Card className="p-6">
              <h4 className="text-sm text-text-secondary mb-2">Recommended</h4>
              <p className="text-text-secondary text-sm">15 minutes is an effective daily habit for retention without burnout.</p>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
