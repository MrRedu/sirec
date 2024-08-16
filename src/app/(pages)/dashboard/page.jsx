'use client'
import { Button } from '@nextui-org/react'
import { signOut } from 'next-auth/react'

export default async function DashboardPage() {
  return (
    <>
      <Button color="primary" onClick={signOut}>
        Cerrar sesión
      </Button>
    </>
  )
}
