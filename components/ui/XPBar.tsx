import React from 'react'

export default function XPBar({ xp = 0, max = 1000 }: { xp?: number; max?: number }) {
  const pct = Math.min(100, Math.round((xp / max) * 100))

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
        <div>XP</div>
        <div>{xp}/{max}</div>
      </div>
      <div className="w-full bg-gray-100 h-3 rounded-full">
        <div className="h-3 rounded-full bg-indigo-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
