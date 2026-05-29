import React from 'react'
import { Check } from 'lucide-react'

export default function RegisterChecklist() {
  const items = ['AI-generated cards', 'Adaptive scheduling', 'Cross-device sync', 'Privacy-first']
  return (
    <ul className="space-y-3 text-sm text-white">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3">
          <span className="mt-1"><Check size={16} /></span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}
