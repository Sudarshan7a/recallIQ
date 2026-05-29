import React from 'react'

export default function AuthBrandPanel({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="hidden xl:flex w-[560px] h-full bg-indigo text-white p-8 flex-col justify-center">
      <div className="max-w-[420px]">
        <div className="text-3xl font-display font-bold mb-4">RecallIQ</div>
        <p className="mb-6 text-indigo-100">Smart spaced repetition backed by adaptive algorithms to help you retain more.</p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">✓</div>
            <div>AI-powered card generation</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">✓</div>
            <div>Optimized review scheduling</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">✓</div>
            <div>Classroom & university integrations</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
