'use client'

import useNav from '@/shared/hooks/useNav'
import { Menu, XIcon } from 'lucide-react'
import Link from 'next/link'
import { type JSX } from 'react'

import './nav.scss'
import { navLinks } from './navLinks'

const Nav = (): JSX.Element => {
  const { getClass, pathname, show, toggleShow } = useNav()

  return (
    <>
      <button className='dsNav-hamburger' onClick={toggleShow}>
        {show ? <XIcon /> : <Menu />}
      </button>
      <nav className={`dsNav ${getClass()}`}>
        {navLinks.map(link => {
          const { Icon, label, route } = link
          const isActive = pathname === route ? 'active' : ''
          return (
            <Link className={`dsNav-item ${isActive}`} href={route} key={route} title={label}>
              <Icon />
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export default Nav
