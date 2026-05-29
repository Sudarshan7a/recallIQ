import React from 'react'

interface PasswordStrengthProps {
  value: string
}

function scorePassword(pw: string) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

export default function PasswordStrength({ value }: PasswordStrengthProps) {
  const score = scorePassword(value)
  const segments = [0,1,2,3]
  return (
    <div className="flex gap-2 mt-2">
      {segments.map((s, i) => {
        const active = i <= score - 1
        const bg = active ? (score <= 1 ? 'bg-red' : score === 2 ? 'bg-amber' : 'bg-teal') : 'bg-[#E5E5E2]'
        return <div key={i} className={`${bg} h-2 flex-1 rounded-sm`} />
      })}
    </div>
  )
}
