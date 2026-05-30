import React from 'react'
import Card from './Card'

export default function ExamActiveCard({ deck = 'Neuroanatomy', question = 'What is the primary function of the amygdala?' }: { deck?: string; question?: string }) {
  return (
    <div>
      <div className="text-center text-xs text-indigo-600 font-medium mb-3">{deck.toUpperCase()} • DECK 3</div>
      <Card className="p-12 min-h-[220px] flex items-center justify-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-text-primary max-w-3xl leading-tight">{question}</h2>
      </Card>
    </div>
  )
}
