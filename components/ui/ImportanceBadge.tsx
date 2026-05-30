import React from 'react'

export default function ImportanceBadge({ level = 'normal' }: { level?: 'low' | 'normal' | 'high' }) {
  const cls = level === 'high' ? 'bg-rose-50 text-rose-700' : level === 'low' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
  return <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${cls}`}>{level.toUpperCase()}</div>
}
