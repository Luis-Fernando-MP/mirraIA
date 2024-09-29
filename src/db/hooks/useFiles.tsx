import { Prisma } from '@prisma/client'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { getUserFiles } from '../service/files'

// Importa correctamente el tipo Prisma

export const IMAGES_NAME_CACHE = 'USER_FILE_IMAGES'

export function useFiles({ where }: { where?: Prisma.ImageWhereInput }) {
  const queryClient = useQueryClient()

  // Usamos useInfiniteQuery para manejar el scroll infinito
  const query = useInfiniteQuery({
    queryKey: [IMAGES_NAME_CACHE, { where }],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getUserFiles({ where: where ?? {}, limit: 5, page: Number(pageParam ?? 1) })
      console.log('query -- -- ', res)

      return res
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage --- - - ', lastPage)
      console.log('allPages --- - - ', allPages)

      // Lógica para determinar si hay más páginas:
      // if (lastPage.length === limit) {
      //   return allPages.length + 1 // Página siguiente
      // }
      // return undefined // No hay más páginas
    },
    staleTime: 500,
    retry: 5,
    placeholderData: [],
    initialDataUpdatedAt: 100
  })

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const lastEntry = entries[0]
        if (lastEntry.isIntersecting && query.hasNextPage) {
          // Si el último elemento es visible y hay más páginas, cargamos la siguiente
          query.fetchNextPage()
        }
      },
      {
        rootMargin: '200px', // Margen para cargar antes de que llegue al final
        threshold: 1.0 // Trigger cuando el elemento es completamente visible
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current) // Observar el último elemento
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current) // Desconectar el observer al desmontar el componente
      }
    }
  }, [query, observerRef])

  return { query, observerRef }
}

// export function useFiles({ limit, where }: { limit: number; where?: Prisma.ImageWhereInput }) {
//   const [page, setPage] = useState(1)
//   const queryClient = useQueryClient()

//   const filters = { page, limit, where }

//   const query = useQuery({
//     queryKey: [USER_FILES_NAME_CACHE, filters],
//     queryFn: async () => await getUserFiles({ where: where ?? {}, limit, page }),
//     placeholderData: keepPreviousData,
//     staleTime: 500,
//     retry: 5,
//     initialDataUpdatedAt: 100
//   })

//   useEffect(() => {
//     if (!query.isPlaceholderData && query.data?.hasMore) {
//       queryClient.prefetchQuery({
//         queryKey: [USER_FILES_NAME_CACHE, { page: page + 1, limit, where }],
//         queryFn: async () => await getUserFiles({ where: where ?? {}, page: page + 1, limit })
//       })
//     }
//   }, [query.data, query.isPlaceholderData, page, queryClient, where, limit])

//   return { query, page, setPage }
// }
