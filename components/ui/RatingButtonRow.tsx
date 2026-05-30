import React from 'react'

export default function RatingButtonRow({ onRate }: { onRate: (rating: number) => void }) {
  const ratings = [1,2,3,4]
  const labels = ['Again','Hard','Good','Easy']
  return (
    <div className="flex gap-2">
      {ratings.map((r, i) => (
        <button key={r} onClick={() => onRate(r)} className="px-3 py-2 rounded-md bg-surface-container text-text-primary border border-surface-variant hover:bg-primary-container/10">
          {labels[i]}
        </button>
      ))}
    </div>
  )
}
