import React from 'react'
import Card from './Card'

interface DeckCardProps {
  title: string
  progress?: number
  count?: number
}

export const DeckCard: React.FC<DeckCardProps> = ({ title, progress = 0, count = 0 }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-text-primary font-medium text-sm">{title}</h3>
          <p className="text-text-secondary text-xs mt-1">{count} cards</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo text-sm font-medium">{Math.round(progress)}%</div>
        </div>
      </div>
    </Card>
  )
}

export default DeckCard
