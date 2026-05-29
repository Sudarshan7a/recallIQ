import React from 'react'

export default function AuthTestimonials() {
  const quotes = [
    { name: 'Maya', text: 'Retained 3x more in half the time.' },
    { name: 'Jordan', text: 'Perfect for cram sessions before exams.' },
  ]

  return (
    <div className="space-y-4 text-white">
      {quotes.map((q) => (
        <blockquote key={q.name} className="text-sm">
          <p className="italic">“{q.text}”</p>
          <footer className="mt-2 text-xs">— {q.name}</footer>
        </blockquote>
      ))}
    </div>
  )
}
