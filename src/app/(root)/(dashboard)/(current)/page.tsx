import { type JSX, Suspense } from 'react'

import PublicationFilters from './components/PublicationFilters'
import RecentPublications from './components/RecentPublications'
import RecentTransform from './components/RecentTransform'
import './dashboardHome.scss'
import './mobile.scss'

const Page = (): JSX.Element => {
  return (
    <section className='dashboard-body home'>
      <header className='dsbHeader'>
        <h1>🎨 ¿Qué Planes Tenemos para Hoy? ¿Algo Creativo por Hacer?</h1>
        <h3>
          Descubre nuevas posibilidades y potencia tu imaginación con MIRRA IA, la herramienta que
          transforma tus ideas en realidad con inteligencia artificial. ¡Exprésate como nunca antes!
        </h3>
      </header>
      <RecentTransform />
      <h2 className='dsbSubTitle'>Creaciones Recientes 🌟 </h2>
      <PublicationFilters />
      <Suspense fallback={<p>loading...</p>}>
        <RecentPublications />
      </Suspense>
    </section>
  )
}

export default Page
