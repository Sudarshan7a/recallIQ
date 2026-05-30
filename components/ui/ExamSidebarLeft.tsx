import React from 'react'
import Card from './Card'
import ProgressRing from './ProgressRing'

export default function ExamSidebarLeft({ reviewed = 7, total = 20, accuracy = 86 }: { reviewed?: number; total?: number; accuracy?: number }) {
  const progress = Math.round((reviewed / total) * 100)

  return (
    <Card className="p-4">
      <h4 className="text-xs text-text-secondary">EXAM PROGRESS</h4>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-primary">{reviewed} / {total}</div>
          <div className="text-sm text-text-secondary">Reviewed</div>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full mt-3">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs text-text-secondary">Current Accuracy</div>
        <div className="text-2xl font-semibold text-emerald-600 mt-2">{accuracy}%</div>
      </div>

      <div className="mt-6 border-t pt-3 text-sm text-text-secondary">13 cards remaining</div>
    </Card>
  )
}
