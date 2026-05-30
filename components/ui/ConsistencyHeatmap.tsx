import React from 'react'

export default function ConsistencyHeatmap({ weeks = 8 }: { weeks?: number }) {
  const days = 7
  const data = Array.from({ length: weeks * days }).map(() => Math.random())

  return (
    <div className="bg-white rounded-xl p-4">
      <h4 className="text-sm text-text-secondary mb-3">Consistency</h4>
      <div className="grid grid-cols-7 gap-1">
        {data.map((v, i) => {
          const intensity = v
          const bg = intensity > 0.75 ? 'bg-indigo-600' : intensity > 0.5 ? 'bg-indigo-400' : intensity > 0.25 ? 'bg-indigo-200' : 'bg-gray-200'
          return <div key={i} className={`${bg} w-5 h-5 rounded-sm`} />
        })}
      </div>
      <div className="text-xs text-text-secondary mt-2">Less</div>
    </div>
  )
}
