'use client'

import IUser from '@/db/types/user.type'
import type { JSX, ReactNode } from 'react'

import Header from './components/Header'
import Nav from './components/Nav'
import './dashboard.scss'
import userStore from './user.state'

interface IDashboard {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  user: IUser | null
}

const Dashboard = ({ children, user }: IDashboard): JSX.Element => {
  const setUser = userStore(st => st.setUser)
  if (user) setUser(user)

  return (
    <main className='dashboard'>
      <Header />
      <Nav />
      <section className='body'>{children}</section>
    </main>
  )
}

export default Dashboard
