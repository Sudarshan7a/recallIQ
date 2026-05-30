"use client"

import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ExamActiveCard from '../../components/ui/ExamActiveCard'
import ExamSidebarLeft from '../../components/ui/ExamSidebarLeft'
import ExamShortcutsRight from '../../components/ui/ExamShortcutsRight'
import RatingButtonRow from '../../components/ui/RatingButtonRow'

export default function ExamPage() {
  const [started, setStarted] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      {!started ? (
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 text-center">
            <h2 className="text-lg font-medium text-text-primary">Exam Mode</h2>
            <p className="text-text-secondary mt-2">Timed test-like review session to simulate recall under pressure.</p>
            <div className="mt-4">
              <Button variant="primary" onClick={() => setStarted(true)}>Start Exam</Button>
            </div>
          </Card>
        </div>
      ) : (
        <div>
          <header className="py-4">
            <div className="flex items-center justify-center">
              <div className="px-4 py-2 bg-rose-50 text-rose-700 rounded-full border border-rose-100">⏱ 05:24</div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <ExamSidebarLeft />
            </div>

            <main className="lg:col-span-6">
              <ExamActiveCard />

              <div className="mt-6 flex items-center justify-center">
                <RatingButtonRow onRate={(r) => {
                  // placeholder: handle rating selection
                  // TODO: integrate exam scoring and navigation
                  console.log('rated', r)
                }} />
              </div>
            </main>

            <aside className="lg:col-span-3">
              <ExamShortcutsRight />
            </aside>
          </div>
        </div>
      )}
    </div>
  )
}
