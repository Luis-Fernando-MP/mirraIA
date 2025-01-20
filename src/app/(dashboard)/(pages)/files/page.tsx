'use client'

import { useFiles } from '@/db/hooks/useFiles'
import { useImages } from '@/db/hooks/useImages'
import { rlvTime } from '@/shared/lib/time'
import CldImageComponent from '@/shared/ui/CldImageComponent'
import { useUser } from '@clerk/nextjs'
import { Image } from '@prisma/client'
import Link from 'next/link'
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

  const pages = query?.data?.pages
  console.log(pages)

  return (
    <>
      <h1>¿Qué hay en mi CUENTA? 📂</h1>
      <h5>
        Revisa lo que has almacenado en tu cofre personal. Accede a tus <br /> imágenes y
        transformaciones guardadas, y administra tus creaciones
        <br /> fácilmente.
      </h5>
      <article className='files-items'>
        <Link href='/transform/restore' className='files-item add'>
          <h4>SUBE TU IMAGEN</h4>
          <p>
            Haz clic aquí para cargar una imagen desde tu dispositivo. Dale vida a tus ideas con un
            toque personal y explora nuevas transformaciones. 🌟
          </p>
        </Link>

        {pages?.map((page: any, pageIndex) => {
          if (page?.images?.length < 1) return null
          return (
            <>
              {page?.images?.map((img: Image) => (
                <Link
                  href={`transform/${img.id}`}
                  className='files-item animate-slide-in-bottom'
                  key={img.id}
                  style={{
                    backgroundImage: `radial-gradient(circle,var(--bg-primary) 35%, ${img?.colors
                      ?.substring(0, 15)
                      .split(',')
                      .map(a => `${a}50`)
                      .join(',')})`
                  }}
                >
                  <CldImageComponent
                    publicId={img.publicId}
                    alt={img.title}
                    className='files-item__images'
                  />
                  <section className='files-item__info'>
                    <h3 className='files-item__title'>{img.title}</h3>
                    <p>
                      {img.authorEditor} ∙ {rlvTime(img.updatedAt)}
                    </p>
                    <div>{img.tags?.split(',').map(tag => <p key={tag}>{tag}</p>)}</div>
                    <h5>{img.visibility}</h5>
                  </section>
                </Link>
              ))}
            </>
          )
        })}
      </article>
      <div ref={observerRef} style={{ height: 1, backgroundColor: 'transparent' }} />
      {isFetchingNextPage && <p>Loading more images...</p>}
      {!hasNextPage && <p>No more images</p>}
    </>
  )
}

export default Page
