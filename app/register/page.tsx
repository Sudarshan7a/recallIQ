"use client"

import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import AuthBrandPanel from '../../components/ui/AuthBrandPanel'
import PasswordStrength from '../../components/ui/PasswordStrength'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleRegister() {
    // mock register
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      <AuthBrandPanel />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[480px]">
          <Card className="p-6">
            <h2 className="text-lg font-medium text-text-primary">Create account</h2>
            <div className="mt-4 space-y-3">
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <PasswordStrength value={password} />
              <Button variant="primary" onClick={handleRegister}>Create account</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
