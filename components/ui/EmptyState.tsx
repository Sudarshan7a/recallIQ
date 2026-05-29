import React from 'react'

export default function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="py-12 flex flex-col items-center text-center">
      <div className="w-36 h-36 bg-surface-container flex items-center justify-center rounded-xl mb-6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 8H9L12 2Z" fill="#5145DD" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
      {description && <p className="text-text-secondary text-sm max-w-md">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
