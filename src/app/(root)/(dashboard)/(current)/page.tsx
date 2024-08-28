import type { JSX } from 'react'

import RecentTransform from './components/RecentTransform'
import './dashboardHome.scss'
import './mobile.scss'

const Page = (): JSX.Element => {
  return (
    <>
      <header className='dsbHeader'>
        <h1>🎨 ¿Qué Planes Tenemos para Hoy? ¿Algo Creativo por Hacer?</h1>
        <h3>
          Descubre nuevas posibilidades y potencia tu imaginación con MIRRA IA, la herramienta que
          transforma tus ideas en realidad con inteligencia artificial. ¡Exprésate como nunca antes!
        </h3>
      </header>
      <h2 className='dsbSubTitle'>Transformaciones Recientes ✨</h2>
      <RecentTransform />
      <h2 className='dsbSubTitle'>Creaciones Recientes 🌟 </h2>
    </>
  )
}

export default Page
