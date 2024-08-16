import propTypes from 'prop-types'

// import { Inter } from "next/font/google";
import './globals.css'

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'SIREC',
  description: '#TODO',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
      // className={inter.className}
      >
        {children}
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: propTypes.node,
}
