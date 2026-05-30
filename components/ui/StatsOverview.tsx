import React from 'react'
import Card from './Card'

export default function StatsOverview() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h4 className="text-sm text-text-secondary">Progress</h4>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-2xl font-semibold text-text-primary">72%</div>
            <div className="text-xs text-text-secondary">Overall mastery</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-text-primary">8h</div>
            <div className="text-xs text-text-secondary">Study time last 7 days</div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h4 className="text-sm text-text-secondary">Recent activity</h4>
        <div className="mt-3 space-y-3">
          <div className="text-sm">Mastered 15 cards in Biochemistry — 2 hours ago</div>
          <div className="text-sm">Created new sub-deck Renal Physiology — Yesterday</div>
        </div>
      </Card>
    </div>
  )
}
