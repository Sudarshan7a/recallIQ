import React, { useState } from 'react'

export default function CardFlip({ front, back }: { front: React.ReactNode; back: React.ReactNode }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="perspective-1000">
      <div className={`relative w-full h-full transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}>
        <div className={`absolute inset-0 backface-hidden ${flipped ? 'hidden' : ''}`}>
          {front}
        </div>
        <div className={`absolute inset-0 backface-hidden rotate-y-180 ${flipped ? '' : 'hidden'}`}>
          {back}
        </div>
      </div>
      <div className="mt-3">
        <button className="text-sm text-indigo-600" onClick={() => setFlipped((s) => !s)}>{flipped ? 'Show front' : 'Flip'}</button>
      </div>
    </div>
  )
}
