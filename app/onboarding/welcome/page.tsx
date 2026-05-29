"use client"

import React from 'react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import { useRouter } from 'next/navigation'

export default function OnboardingWelcome() {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 text-center">
        <h1 className="text-2xl font-display font-semibold text-text-primary">Welcome to RecallIQ</h1>
        <p className="text-text-secondary mt-2">Smart spaced repetition to help you remember more.</p>
        <div className="mt-6">
          <Button variant="primary" onClick={() => router.push('/dashboard')}>Get started</Button>
        </div>
      </Card>
    </div>
  )
}
