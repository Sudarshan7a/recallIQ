import React from 'react'
import Button from './Button'

export default function ReviewCardOptionsMenu({ onSkip, onFlag }: { onSkip?: ()=>void, onFlag?: ()=>void }) {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" onClick={onSkip}>Skip</Button>
      <Button variant="ghost" onClick={onFlag}>Flag</Button>
    </div>
  )
}
