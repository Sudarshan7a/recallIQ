"use client"

import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export default function AddPage() {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [error, setError] = useState('')

  function handleSave() {
    if (!front.trim() || !back.trim()) {
      setError('Both front and back are required')
      return
    }
    setError('')
    // mock save
    alert('Card saved (mock)')
    setFront('')
    setBack('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary">Add new card</h2>
        <div className="mt-4 space-y-3">
          <Input placeholder="Front (question)" value={front} onChange={(e) => setFront(e.target.value)} error={error ? undefined : undefined} />
          <Input placeholder="Back (answer)" value={back} onChange={(e) => setBack(e.target.value)} />
          {error && <div className="text-red text-sm">{error}</div>}
          <div className="mt-4 flex gap-3">
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button variant="ghost" onClick={() => { setFront(''); setBack(''); setError('') }}>Clear</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
