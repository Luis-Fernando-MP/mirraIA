import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { JSX, ReactNode } from 'react'

import './globals.css'
import Providers from './providers'

interface IRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JU IMAGES',
  description: 'Generador y transformador de imágenes',
  icons: {
    icon: [
      { url: '/favicon.ico', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.ico', media: '(prefers-color-scheme: dark)' }
    ]
  }
}

const RootLayout = ({ children }: IRootLayout): JSX.Element => {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
