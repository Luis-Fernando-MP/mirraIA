import { getUserById } from '@/db/actions/user.action'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import Image from 'next/image'
import { type JSX, type ReactNode, use } from 'react'

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
    user = await getUserById(userId)
    user = JSON.parse(JSON.stringify(user))
  }
  if (user && userId) {
    return <Dashboard user={user}>{children}</Dashboard>
  }
  return <Landing />
}

export default RootLayout
