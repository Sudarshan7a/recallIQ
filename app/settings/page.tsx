"use client"

import React from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-display font-semibold text-text-primary mb-4">Settings</h1>
      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-text-primary font-medium">Dark mode</div>
            <div className="text-text-secondary text-sm">Toggle theme</div>
          </div>
          <Button variant="ghost">Toggle</Button>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-text-primary font-medium">Notifications</div>
            <div className="text-text-secondary text-sm">Alerts about due cards</div>
          </div>
          <Button variant="ghost">Manage</Button>
        </div>
      </Card>
    </div>
  )
}
