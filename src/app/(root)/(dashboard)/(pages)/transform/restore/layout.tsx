import type { JSX, ReactNode } from 'react'

import NavBar from '../components/NavBar'
import './style.scss'
import './userMobile.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <section className='dashboard-body restore trsDashboard'>
      <NavBar
        title='Restaura tu Imagen'
        description='Transforma y revitaliza tus fotos. Recupera la calidad, mejora los detalles y da nueva
          vida a tus imágenes en solo unos clics. ¡Haz que tus recuerdos brillen nuevamente! 🚀📸'
      />
      <article className='dsRSContainer'>{children}</article>
    </section>
  )
}

export default Layout
