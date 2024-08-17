import propTypes from 'prop-types'

// import { Inter } from "next/font/google";
import './globals.css'
import { Providers } from './components/hoc/Providers'

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'SIREC',
  description: '#TODO',
}

export default async function RootLayout({
  children,
  params: { session, ...params },
}) {
  return (
    <html lang="es">
      <body
      // className={inter.className}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: propTypes.node,
  params: propTypes.shape({ session: propTypes.object }),
}
