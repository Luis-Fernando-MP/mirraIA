import { MontserratFont, PlayFairFont, RobotoFont } from '@/shared/lib/fonts'
import type { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Header from './(dashboard)/components/Header'
import Nav from './(dashboard)/components/Nav'
import './globals.css'
import './index.scss'
import './mobile.scss'
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
        <Providers>
          <main className='dashboard'>
            <Header />
            <section className='dashboard-container'>
              <Nav />
              {children}
            </section>
          </main>
        </Providers>
        <Toaster position='top-center' reverseOrder gutter={3} />
      </body>
    </html>
  )
}

export default RootLayout
