import { MontserratFont, PlayFairFont, RobotoFont } from '@/shared/lib/fonts'
import { Toaster } from '@pheralb/toast'
import type { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'

import './globals.css'
import './index.scss'
import Providers from './providers'

interface IRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'Mirra IA',
  description: 'Generador y transformador de imágenes',
  icons: {
    icon: [
      { url: '/favicon.ico', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.ico', media: '(prefers-color-scheme: dark)' }
    ]
  }
}

const RootLayout = async ({ children }: IRootLayout): Promise<JSX.Element> => {
  return (
    <html lang='es'>
      <body
        className={`${MontserratFont.variable} ${RobotoFont.variable} ${PlayFairFont.variable}`}
      >
        <Providers>{children}</Providers>
        <Toaster position='top-center' theme='light' maxToasts={10} />
      </body>
    </html>
  )
}

export default RootLayout
