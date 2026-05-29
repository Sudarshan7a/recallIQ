import React from 'react'
import Button from './Button'

export default function AddContentError({ message, onRetry }: { message?: string, onRetry?: ()=>void }) {
  return (
    <div className="p-4 bg-error-container rounded-md text-error">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Something went wrong</div>
          {message && <div className="text-sm mt-1">{message}</div>}
        </div>
        <div>
          <Button variant="primary" onClick={onRetry}>Retry</Button>
        </div>
      </div>
    </div>
  )
}
