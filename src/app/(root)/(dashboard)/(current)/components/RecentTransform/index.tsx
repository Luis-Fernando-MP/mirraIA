'use client'

import dashboardLinks from '@/dashboard/dashboardLinks'
import Link from 'next/link'
import type { JSX } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import './style.scss'
import './userMobile.scss'

const RecentTransform = (): JSX.Element | null => {
  const [recent] = useLocalStorage('recentTransforms', [], {
    initializeWithValue: false
  })
  if (!recent || recent.length < 1) return null
  return (
    <>
      <h2 className='dsbSubTitle'>Transformaciones Recientes ✨</h2>
      <section className='dsbRecentTransform'>
        {recent.map((item: string) => {
          if (!(item in dashboardLinks)) return null
          const { Icon, expressionInfo, shortTitle, route } = dashboardLinks[item as 'home']
          return (
            <Link href={route} key={item} className='dsbRecentTransform-item'>
              <Icon className='icon' />
              <div className='dsbRecentTransform-item__info'>
                <h3>{shortTitle}</h3>
                <p>{expressionInfo}</p>
              </div>
            </Link>
          )
        })}
      </section>
    </>
  )
}

export default RecentTransform
