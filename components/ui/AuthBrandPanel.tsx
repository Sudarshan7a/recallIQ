import React from 'react'
import AuthTestimonials from './AuthTestimonials'
import RegisterChecklist from './RegisterChecklist'

type Props = {
  children?: React.ReactNode
  variant?: 'login' | 'register'
}

export default function AuthBrandPanel({ variant = 'login' }: Props) {
  return (
    <aside className="hidden xl:flex w-[560px] h-full bg-primary text-white p-8 flex-col justify-center">
      <div className="max-w-[420px]">
        <div className="text-3xl font-display font-bold mb-4">RecallIQ</div>
        <p className="mb-6 text-primary-container/90">Smart spaced repetition backed by adaptive algorithms to help you retain more.</p>
        <div className="space-y-6">
          {variant === 'register' ? (
            <RegisterChecklist />
          ) : (
            <div>
              <AuthTestimonials />
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
