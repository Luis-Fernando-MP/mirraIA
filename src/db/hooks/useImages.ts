'use client'

import { useQuery } from '@tanstack/react-query'

import { IImagesByFilter, getImagesByQuery } from '../actions/image.action'

export const IMAGES_NAME_CACHE = 'PUBLICATION_IMAGES'
// queryFn:  await getImagesByQuery({ query: imagesFilter.community.query() }),

export function useImages(filters: IImagesByFilter) {
  // const queryClient = useQueryClient()
  // const cacheAllRooms = (queryClient.getQueryData([ROOMS_NAME_CACHE]) as TFullDataRoom[]) || []

  return useQuery({
    queryKey: [IMAGES_NAME_CACHE, filters],
    queryFn: async ({ queryKey }) => {
      const [, filters] = queryKey
      return await getImagesByQuery(filters as IImagesByFilter)
    },
    staleTime: 100,
    retry: 5,
    initialDataUpdatedAt: 100
  })
}
