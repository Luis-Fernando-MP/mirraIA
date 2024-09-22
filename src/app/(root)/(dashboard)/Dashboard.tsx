'use client'

import { User } from '@prisma/client'
import type { JSX, ReactNode } from 'react'

import Header from './components/Header'
import Nav from './components/Nav'
import './dashboard.scss'
import './mobile.scss'
import userStore from './user.state'

interface IDashboard {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  user: User | null
}

const Dashboard = ({ children, user }: IDashboard): JSX.Element => {
  const setUser = userStore(st => st.setUser)
  if (user) setUser(user)

  return (
    <main className='dashboard'>
      <Header />
      <section className='dashboard-container'>
        <Nav />
        {children}
      </section>
    </main>
  )
}

export default Dashboard
