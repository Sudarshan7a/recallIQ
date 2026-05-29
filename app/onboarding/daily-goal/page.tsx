"use client"

import React from 'react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

const goals = [5,10,15,30]

export default function DailyGoal() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-display font-semibold text-text-primary">Daily study goal</h1>
        <p className="text-text-secondary">Choose how many minutes you'd like to study each day.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {goals.map((g) => (
          <div key={g} className={`flex justify-center`}> 
            <Card className={`p-4 ${g===15 ? 'border-2 border-indigo scale-105 h-[156px]' : 'h-[140px]'}`}>
              <div className="text-center">
                <div className="text-2xl font-semibold text-text-primary">{g} min</div>
                <div className="text-text-secondary text-sm mt-2">per day</div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="primary">Finish</Button>
      </div>
    </div>
  )
}
