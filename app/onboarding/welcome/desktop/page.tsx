"use client"

import React from 'react'
import Card from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'
import OnboardingTransition from '../../../../components/ui/OnboardingTransition'

export default function OnboardingWelcomeDesktop() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
      <div className="max-w-6xl w-full grid grid-cols-12 gap-8 items-center">
        <aside className="col-span-5 hidden lg:flex items-center justify-center">
          <div className="w-full max-w-sm">
            <img src="/image.png" alt="illustration" className="rounded-xl shadow-pop" />
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-7">
          <OnboardingTransition>
            <Card className="p-10">
              <h1 className="text-3xl font-display font-bold mb-3">Welcome to RecallIQ</h1>
              <p className="text-text-secondary mb-6">Get started by selecting your subjects and set a daily study goal.</p>
              <div className="flex gap-3">
                <Button variant="primary">Get started</Button>
                <Button variant="ghost">Maybe later</Button>
              </div>
            </Card>
          </OnboardingTransition>
        </main>
      </div>
    </div>
  )
}
