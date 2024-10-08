'use client'
import { FormLogin } from '#/src/app/components/organisms/ui/forms/FormLogin'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

// #TODO: Metadata (?)

export default function LoginPage() {
  const { data: session } = useSession()
  if (session) redirect('/dashboard')

  return (
    <div className="flex flex-wrap w-full md:p-12 items-center h-screen">
      <div className="w-full p-4 lg:w-1/2">
        <FormLogin />
      </div>
      <div className="w-1/2 hidden lg:flex"></div>

      {/* Bg */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[url('/connections.webp')] bg-cover opacity-60"></div>
      </div>
    </div>
  )
}
