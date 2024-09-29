import type { JSX, ReactNode } from 'react'

import './style.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return <section className='dashboard-body files'>{children}</section>
}

export default Layout
