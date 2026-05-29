"use client"

import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleLogin() {
    // mock login
    router.push('/dashboard')
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card className="p-6">
        <h2 className="text-lg font-medium text-text-primary">Sign in</h2>
        <div className="mt-4 space-y-3">
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="primary" onClick={handleLogin}>Sign in</Button>
        </div>
      </Card>
    </div>
  )
}
