'use client'

import useNav from '@/shared/hooks/useNav'
import { acl } from '@/shared/lib/activeClass'
import { Menu, XIcon } from 'lucide-react'
import Link from 'next/link'
import { type JSX } from 'react'

import ROUTES, { matchRoute } from '../../routes'
import './nav.scss'

const Nav = (): JSX.Element => {
  const { getClass, pathname, show, toggleShow } = useNav()

  return (
    <>
      <button className='dsNav-hamburger' onClick={toggleShow}>
        {show ? <XIcon /> : <Menu />}
      </button>
      <nav className={`dsNav ${getClass()}`}>
        {Object.values(ROUTES).map(link => {
          const { Icon, label, route } = link

          const isActive = acl(matchRoute({ path: pathname, route }))
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
