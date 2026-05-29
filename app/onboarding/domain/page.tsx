"use client"

import React from 'react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

const domains = ['Math', 'Science', 'Languages', 'History', 'Programming', 'Art']

export default function DomainSelection() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-display font-semibold text-text-primary">Choose your domains</h1>
        <p className="text-text-secondary">Pick topics you want to study.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {domains.map((d) => (
          <Card key={d} className="p-4 flex items-center justify-center h-24">
            <div className="text-text-primary font-medium">{d}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="primary">Continue</Button>
      </div>
    </div>
  )
}
