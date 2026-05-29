import React from 'react'
import Card from './Card'
import Button from './Button'

export default function AddContentResults({ items, onSave }: { items: Array<{front:string,back:string}>, onSave?: (i:number)=>void }) {
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <Card key={idx} className="p-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium">{it.front}</div>
              <div className="text-xs text-text-secondary mt-1">{it.back}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button variant="ghost" onClick={() => onSave && onSave(idx)}>Save</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
