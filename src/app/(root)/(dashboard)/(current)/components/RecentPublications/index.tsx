'use client'

import imagesFilter from '@/db/helpers/filters'
import { useImages } from '@/db/hooks/useImages'
import { type JSX, useEffect } from 'react'

import CommunityPublications from '../CommunityPublications'

const RecentPublications = (): JSX.Element | null => {
  // const community = await getImagesByQuery({ query: imagesFilter.community.query() })
  // if (!community.images) return null
  const { data } = useImages({ query: imagesFilter.community.query(), limit: 10, page: 1 })
  console.log(data)
  useEffect(() => {
    console.log('mount')

    return () => {
      console.log('unmount-------')
    }
  }, [])
  if (!data) return null

  return <CommunityPublications community={data} />
}

export default RecentPublications
