import React from 'react'

export default function DeckMastery({ items }: { items?: Array<{ title: string; progress: number }> }) {
  const list = items ?? [
    { title: 'Pathology', progress: 92 },
    { title: 'Microbiology', progress: 74 },
    { title: 'Anatomy', progress: 46 },
  ]

  return (
    <div className="bg-white rounded-xl p-4">
      <h4 className="text-sm text-text-secondary mb-3">Deck Mastery</h4>
      <div className="space-y-3">
        {list.map((d) => (
          <div key={d.title}>
            <div className="flex items-center justify-between text-sm text-text-primary">
              <div>{d.title}</div>
              <div className="text-xs text-text-secondary">{d.progress}%</div>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
              <div className="h-2 rounded-full bg-green-600" style={{ width: `${d.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="w-full border border-indigo-200 text-indigo-700 rounded-md py-2">Manage Decks</button>
      </div>
    </div>
  )
}
