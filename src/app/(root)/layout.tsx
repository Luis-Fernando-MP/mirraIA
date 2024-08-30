import { getUserById } from '@/db/actions/user.action'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { type JSX, type ReactNode } from 'react'

import Dashboard from './(dashboard)/Dashboard'
import Landing from './(landing)/Landing'

interface IRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'JU IMAGES'
}

const RootLayout = async ({ children }: IRootLayout): Promise<JSX.Element> => {
  const { userId } = auth()
  let user = null

  if (userId) {
    try {
      user = await getUserById(userId)
      user = JSON.parse(JSON.stringify(user))
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  return user ? <Dashboard user={user}>{children}</Dashboard> : <Landing />
}

export default RootLayout
