'use client'
import propTypes from 'prop-types'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
export const Providers = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster />
    </SessionProvider>
  )
}
Providers.propTypes = {
  children: propTypes.node,
  session: propTypes.object,
}
