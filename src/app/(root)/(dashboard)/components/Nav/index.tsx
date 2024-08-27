import Link from 'next/link'
import type { JSX } from 'react'

import { navLinks } from './navLinks'

const Nav = (): JSX.Element => {
  return (
    <nav className='flex w-full items-center justify-center gap-2'>
      {navLinks.map(link => {
        const { Icon, label, route } = link
        return (
          <Link
            href={route}
            key={route}
            className='flex items-center gap-2 rounded-lg bg-slate-300 p-2'
          >
            <p>{label}</p>
            <Icon />
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
