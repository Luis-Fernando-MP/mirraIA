import { getUserById } from '@/db/actions/user.action'
import { auth } from '@clerk/nextjs/server'
import { User } from '@prisma/client'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { type JSX, type ReactNode } from 'react'

interface IRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'JU IMAGES'
}

const RootLayout = async ({ children }: IRootLayout): Promise<JSX.Element> => {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  let user: User | null = null
  if (userId) {
    try {
      user = await getUserById(userId)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  // const setUser = userStore(st => st.setUser)
  // if (user) setUser(user)

  return <>{children}</>
}

export default RootLayout
