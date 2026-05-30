import React from 'react'
import Card from './Card'

export default function ExamShortcutsRight() {
  return (
    <Card className="p-4">
      <h4 className="text-sm text-text-secondary">SHORTCUTS</h4>
      <div className="mt-4 space-y-3 text-sm text-text-secondary">
        <div className="flex items-center justify-between">
          <div>Forgot</div>
          <div className="px-2 py-1 bg-surface-container rounded">1</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Hard</div>
          <div className="px-2 py-1 bg-surface-container rounded">2</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Got it</div>
          <div className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded">3</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Easy</div>
          <div className="px-2 py-1 bg-surface-container rounded">4</div>
        </div>
      </div>

      <div className="mt-4 border-t pt-3 text-sm text-text-secondary">Flip Card <span className="ml-2 px-2 py-1 bg-surface-container rounded">Space</span></div>
    </Card>
  )
}
