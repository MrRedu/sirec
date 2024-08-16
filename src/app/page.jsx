'use client'
import { FormLogin } from '@/components/organisms/FormLogin'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

// #TODO: Metadata (?)

export default function LoginPage() {
  const { data: session } = useSession()
  if (session) redirect('/dashboard')

  return (
    <>
      <h2>LoginPage</h2>
      <FormLogin />
    </>
  )
}
