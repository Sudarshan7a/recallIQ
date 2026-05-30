import React from 'react'

export default function MasteryRing({ percent = 0, size = 48 }: { percent?: number; size?: number }) {
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  const dash = (percent / 100) * c

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={r} cx={0} cy={0} fill="transparent" stroke="#eee" strokeWidth={6} />
        <circle r={r} cx={0} cy={0} fill="transparent" stroke="#10B981" strokeWidth={6} strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" transform="rotate(-90)" />
        <text x="0" y="4" textAnchor="middle" className="text-sm fill-current" style={{ fontSize: 12 }}>
          {Math.round(percent)}%
        </text>
      </g>
    </svg>
  )
}
