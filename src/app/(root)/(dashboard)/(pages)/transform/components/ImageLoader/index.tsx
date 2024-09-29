'use client'

import { acl } from '@/shared/lib/activeClass'
import { TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { JSX, ReactNode } from 'react'
import toast from 'react-hot-toast'

import './style.scss'

/* eslint-disable @next/next/no-img-element */

interface IImageLoader {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  imageUrl: string
  fallback: string
}

const ImageLoader = ({ imageUrl, fallback }: IImageLoader): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const { replace } = useRouter()
  const $image = useRef<HTMLImageElement>(null)
  const isNull = imageUrl === null || imageUrl === 'null' || !imageUrl

  if (isNull) {
    toast.error('⚠️ El archivo ya fue guardado', {
      id: 'TRANSFORM_IMAGE_IS_NULL',
      icon: <TriangleAlert />,
      style: { backgroundColor: '#FFA500' }
    })
    replace('/')
  }

  useEffect(() => {
    const imgElement = $image.current
    if (isNull || !imgElement) return

    const toastId = toast.loading('⏳ Cargando transformación...', { id: 'LOADER_IMAGE' })

    const handleLoad = () => {
      setLoading(false)
      toast.success('✨ Miremos los resultados', { id: toastId })
    }

    const handleError = () => {
      toast.error('🚨 Se excedió el upscale. Cargando fallback...', { id: 'FALLBACK' })
      const time = setTimeout(() => {
        imgElement.src = imageUrl.replace('/e_upscale', '')
        setLoading(false)
        clearTimeout(time)
      }, 1000)
    }

    imgElement.onload = handleLoad
    imgElement.onerror = handleError

    // Limpieza
    return () => {
      imgElement.onload = null
      imgElement.onerror = null
    }
  }, [imageUrl, isNull, replace])

  return (
    <div className={`ImageLoader ${acl(!loading, 'loaded')}`}>
      <img src={fallback} alt='Cargando...' className='ImageLoader-fallback' />
      <img src={imageUrl} ref={$image} alt='Resultado transformado' className='ImageLoader-image' />
    </div>
  )
}

export default ImageLoader
