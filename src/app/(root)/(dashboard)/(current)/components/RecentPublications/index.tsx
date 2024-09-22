'use client'

import imagesFilter from '@/db/helpers/filters'
import { useImages } from '@/db/hooks/useImages'
import { type JSX } from 'react'

import CommunityPublications from '../CommunityPublications'

const RecentPublications = (): JSX.Element | null => {
  const { data } = useImages({ query: imagesFilter.community.query(), limit: 10, page: 1 })
  if (!data) return null
  return <CommunityPublications community={data} />
}

export default RecentPublications
