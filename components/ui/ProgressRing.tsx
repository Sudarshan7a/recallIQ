import React from 'react'

interface ProgressRingProps {
  size?: number
  stroke?: number
  progress: number
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ size = 48, stroke = 6, progress }) => {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="block">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E5E5E2"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#5C51E8"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

export default ProgressRing
