import { getImagesByQuery } from '@/db/actions/image.action'
import imagesFilter from '@/db/helpers/filters'
import type { JSX } from 'react'

import CommunityPublications from '../CommunityPublications'

const RecentPublications = async (): Promise<JSX.Element | null> => {
  const community = await getImagesByQuery({ query: imagesFilter.community.query() })
  if (!community.images) return null
  return <CommunityPublications community={community} />
}

export default RecentPublications
