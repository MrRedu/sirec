import propTypes from 'prop-types'
import { Header } from '@/components/organisms/ui/Header'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/')

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: propTypes.node,
}
