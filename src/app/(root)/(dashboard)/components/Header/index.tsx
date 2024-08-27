import Logo from '@/shared/ui/icons/Logo'
import { UserButton } from '@clerk/nextjs'
import type { JSX } from 'react'

import TagHero from '../TagHero'
import './header.scss'

const Header = (): JSX.Element => {
  return (
    <header className='dsHeader'>
      <section className='dsHeader-box'>
        <Logo />
        <div className='logo-info'>
          <h3>MIRA IA</h3>
          <span>JUSI GROUP</span>
        </div>
      </section>
      <section className='dsHeader-box'>
        <TagHero />
      </section>
      <section className='dsHeader-box user'>
        <UserButton showName />
      </section>
    </header>
  )
}

export default Header
