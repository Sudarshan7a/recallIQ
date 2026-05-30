"use client"

import React from 'react'
import Card from '../../../../components/ui/Card'
import OnboardingTransition from '../../../../components/ui/OnboardingTransition'

const domains = ['Math','Science','Languages','History','Programming','Art','Business','Medicine']

export default function DomainSelectionDesktop() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-12 gap-8 items-start">
        <main className="col-span-12 lg:col-span-8">
          <OnboardingTransition>
            <h1 className="text-3xl font-display font-bold mb-4">Choose your domains</h1>
            <p className="text-text-secondary mb-6 max-w-2xl">Pick the subjects you want to study. You can change these later.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {domains.map((d) => (
                <Card key={d} className="p-6 flex items-center justify-center h-28">
                  <div className="text-text-primary font-medium">{d}</div>
                </Card>
              ))}
            </div>
          </OnboardingTransition>
        </main>

        <aside className="hidden lg:flex col-span-4 items-center justify-center">
          <div className="w-full max-w-sm">
            <Card className="p-6">
              <h4 className="text-sm text-text-secondary mb-2">Why this matters</h4>
              <p className="text-text-secondary text-sm">Selecting focused domains improves the generated cards and review schedules.</p>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
