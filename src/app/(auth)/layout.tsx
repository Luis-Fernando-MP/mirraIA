import type { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

export const metadata: Metadata = {
  title: 'Dashboard: Life Stream'
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <section className='dashboard-body auth'>
      <div className='auth-form'>
        <p>M I R R A &nbsp; I A</p>
        {children}
      </div>
    </section>
  )
}

export default Layout
