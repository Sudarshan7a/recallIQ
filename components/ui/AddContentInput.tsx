"use client"

import React, { useState } from 'react'
import Button from './Button'

export default function AddContentInput({ onGenerate }: { onGenerate: (text: string) => void }) {
  const [text, setText] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (text.trim()) onGenerate(text.trim())
      }}
      className="space-y-3"
    >
      <textarea
        placeholder="Paste notes or type a prompt to generate cards"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full min-h-[120px] rounded-sm border-[1.5px] px-4 py-3 bg-surface font-sans text-[15px] text-text-primary placeholder:text-text-secondary transition-all outline-none"
      />
      <div className="flex justify-end">
        <Button variant="primary" type="submit">Generate</Button>
      </div>
    </form>
  )
}
