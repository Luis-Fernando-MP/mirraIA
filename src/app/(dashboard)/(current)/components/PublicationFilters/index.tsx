'use client'

import { getImagesByQuery } from '@/db/actions/image.action'
import type { TFilterKeys } from '@/db/helpers/filters'
import imagesFilter from '@/db/helpers/filters'
import { acl } from '@/shared/lib/activeClass'
import { type JSX, useState } from 'react'

import publicationsStore from '../../store/publicationsStore'
import './style.scss'

const listUseFilter = [
  {
    key: 'community',
    query: imagesFilter.community.query(),
    tag: imagesFilter.community.tag()
  },
  {
    key: 'recentAt',
    query: imagesFilter.recentAt.query(7),
    tag: imagesFilter.recentAt.tag(7)
  },
  {
    key: 'popular',
    query: imagesFilter.popular.query(),
    tag: imagesFilter.popular.tag()
  }
]

const PublicationFilters = (): JSX.Element | null => {
  const { publications, setPubs } = publicationsStore()
  const [filter, setFilter] = useState<TFilterKeys>('community')
  const publicationsIsEmpty = publications.length < 1
  if (publicationsIsEmpty) return null

  const handleFilter = async (query: any, filter: TFilterKeys) => {
    const newData = await getImagesByQuery({ query })
    setPubs(newData.images)
    setFilter(filter)
  }

  return (
    <article className='dPublicationFilters'>
      {listUseFilter.map(filterUse => {
        const { tag, query, key } = filterUse
        return (
          <button
            key={tag}
            className={`dPublicationFilters-filter ${acl(filter === key)}`}
            onClick={async () => await handleFilter(query, key as TFilterKeys)}
          >
            {tag}
          </button>
        )
      })}
    </article>
  )
}

export default PublicationFilters
