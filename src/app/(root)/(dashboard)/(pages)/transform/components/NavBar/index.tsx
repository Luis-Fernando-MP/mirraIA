import Meme from '@/shared/ui/Meme'
import Link from 'next/link'
import type { JSX, ReactNode } from 'react'

import './style.scss'
import './userMobile.scss'

interface INavBar {
  children?: Readonly<ReactNode[]> | null
  title: string
  description: string
}

const NavBar = ({ description, title }: INavBar): JSX.Element => {
  return (
    <nav className='dsRSNav'>
      <Link href='restore/me' className='dsRSNav-link'>
        <h3>Quiero ver mis imágenes transformadas 🖼️ ↗️</h3>
        <p>
          Cambia a la vista de tus imágenes transformadas para revisar y gestionar los cambios que
          has aplicado. Explora todas tus fotos con las nuevas transformaciones.
        </p>
      </Link>
      <div className='dsRSNav-title'>
        <h2>{title}</h2>
        <p>{description} </p>
      </div>
      <Meme />
    </nav>
  )
}

export default NavBar
