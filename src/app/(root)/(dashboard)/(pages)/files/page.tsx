'use client'

import { useFiles } from '@/db/hooks/useFiles'
import { useImages } from '@/db/hooks/useImages'
import CldImageComponent from '@/shared/ui/CldImageComponent'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import type { JSX } from 'react'

const Page = (): JSX.Element => {
  const user = useUser()
  const { replace } = useRouter()
  if (!user) replace('/sign-in')

  const { query, observerRef } = useFiles({
    where: {}
  })
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = query

  const images = query?.data?.pages
  if (!images) return null
  return (
    <div>
      <h1>¿Qué hay en mi CUENTA? 📂</h1>
      <h4>
        Revisa lo que has almacenado en tu cofre personal. Accede a tus <br /> imágenes y
        transformaciones guardadas, y administra tus creaciones
        <br /> fácilmente.
      </h4>
      {/* <button onClick={() => setPage(page + 1)}>Change Page {page}</button> */}
      {/* <div className='flex h-auto w-full flex-wrap gap-3'>
        {images?.map(img => {
          return <CldImageComponent key={img.id} publicId={img.publicId} alt={img.title} />
        })}
      </div> */}
      {data?.pages.map((page, pageIndex) => {
        return (
          <div key={pageIndex}>
            {page?.images?.map(img => (
              <CldImageComponent key={img.id} publicId={img.publicId} alt={img.title} />
            ))}
          </div>
        )
      })}

      <div ref={observerRef} style={{ height: 1, backgroundColor: 'transparent' }} />

      {isFetchingNextPage && <p>Loading more images...</p>}
      {!hasNextPage && <p>No more images</p>}
    </div>
  )
}

export default Page
