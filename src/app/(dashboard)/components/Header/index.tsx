'use client'

import AuthButton from '@/shared/ui/AuthButton'
import Logo from '@/shared/ui/icons/Logo'
import type { JSX } from 'react'

import TagHero from '../TagHero'
import './header.scss'
import './userMobile.scss'

const Header = (): JSX.Element => {
  return (
    <header className='dsHeader'>
      <section className='dsHeader-box'>
        <Logo />
        <div className='logo-info'>
          <h3>MIRRA IA</h3>
          <span>JUSI GROUP</span>
        </div>
      </section>
      <section className='dsHeader-box'>
        <TagHero />
      </section>
      <section className='dsHeader-box user'>
        <AuthButton />
      </section>
    </header>
  )
}

export default Header
