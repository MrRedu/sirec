import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import { validatePassword } from '@/services/authService'

async function login(credentials) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${credentials.email}`
    )
    if (!response.ok) throw new Error('Something went wrong')
    // const result = await response.json()
    const { data: user } = await response.json()
    if (!user) throw new Error('Incorrect credentials')

    const isPasswordValid = await validatePassword(
      credentials.password,
      user.password_user
    )

    if (!isPasswordValid) throw new Error('Incorrect credentials')
    return user
  } catch (error) {
    console.error('Error while logging in: ', error)
    throw new Error('Something went wrong')
  }
}

export const authOptions = {
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      authorize: async credentials => {
        try {
          const user = await login(credentials)
          return user
        } catch (error) {
          throw new Error('Failed to login')
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id_user = user.id_user
        token.email = user.email_user
        token.name = user.name_user
        token.id_rol = user.id_rol
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id_user = token.id_user
        session.user.email = token.email
        session.user.names = token.name
        session.user.id_rol = token.id_rol
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
