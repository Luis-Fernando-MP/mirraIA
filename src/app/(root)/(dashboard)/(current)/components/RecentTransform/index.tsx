'use client'

import dashboardLinks from '@/dashboard/dashboardLinks'
import Link from 'next/link'
import type { JSX } from 'react'

import './style.scss'
import './userMobile.scss'

const RecentTransform = (): JSX.Element => {
  const recentTransforms = getLocalStorage<any>('recentTransforms')
  console.log(recentTransforms)

  return (
    <section className='dsbRecentTransform'>
      {recentTransforms.map((item: string) => {
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
  )
}

export default RecentTransform

function getLocalStorage<T>(id: string) {
  let data: T[] = []
  try {
    data = JSON.parse(localStorage.getItem('recentTransforms') ?? '[]')
    if (!Array.isArray(data)) {
      data = []
    }
  } catch (error) {
    console.error(error)
  }
  return data
}
