import React from 'react'

export default function AddContentLoading() {
  return (
    <div className="space-y-3">
      <div className="h-4 bg-surface-variant rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-surface-variant rounded w-5/6 animate-pulse" />
      <div className="h-4 bg-surface-variant rounded w-2/3 animate-pulse" />
    </div>
  )
}
