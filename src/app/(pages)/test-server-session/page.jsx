import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'

export default async function TestServerSessionPage() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  )
}
