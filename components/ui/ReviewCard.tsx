"use client"

import React, { useState } from 'react'
import Card from './Card'
import Button from './Button'
import RatingButtonRow from './RatingButtonRow'
import ReviewCardOptionsMenu from './ReviewCardOptionsMenu'

export default function ReviewCard({ card, onRate, onSkip }: { card: {front:string,back:string}, onRate: (r:number)=>void, onSkip?: ()=>void }) {
  const [showBack, setShowBack] = useState(false)

  return (
    <Card className="p-6">
      <div className="text-sm text-text-secondary">Question</div>
      <div className="mt-3 text-text-primary text-lg font-medium">{card.front}</div>
      {showBack && <div className="mt-4 text-text-secondary">{card.back}</div>}

      <div className="mt-4 flex items-center justify-between">
        {!showBack ? (
          <Button variant="secondary" onClick={() => setShowBack(true)}>Show Answer</Button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <RatingButtonRow onRate={onRate} />
            <div className="ml-4">
              <ReviewCardOptionsMenu onSkip={onSkip} onFlag={() => alert('Flagged')} />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
