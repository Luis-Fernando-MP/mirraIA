'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { IImagesByFilter, getImagesByQuery } from '../actions/image.action'
import { saveImage, saveTransformImage } from '../service/image'

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

export function useCreateImage() {
  const mutation = useMutation({
    mutationFn: saveImage,
    onError(error) {
      console.log(error)
    },
    retry: 3
  })
  return mutation
}

export function useSaveTransformImage() {
  const mutation = useMutation({
    mutationFn: saveTransformImage,
    onError(error) {
      console.log(error)
    },
    retry: 3
  })
  return mutation
}
