/* eslint-disable @next/next/no-img-element */
import { acl } from '@/shared/lib/activeClass'
import type { JSX, ReactNode } from 'react'

import './style.scss'
import './userMobile.scss'

interface IPreviewImage {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  imagePreview?: string
  isLoading?: boolean
  progress?: number
  openDirectory?: () => void
  closePreview?: () => void
}

const PreviewImage = ({
  imagePreview = '',
  isLoading = false,
  progress = 0,
  closePreview,
  openDirectory
}: IPreviewImage): JSX.Element => {
  return (
    <aside className='IPreviewImage'>
      <div className='IPreviewImage-actions'>
        <button type='button' onClick={openDirectory} className='IPreviewImage-chooseFIle'>
          📁 Seleccionar otra imagen
        </button>
        <button type='button' onClick={closePreview} className='IPreviewImage-cancel'>
          ❌ Cancelar imagen
        </button>
      </div>
      <div className={`IPreviewImage-image ${acl(isLoading, 'loading')}`}>
        {!isLoading && <img src={imagePreview} alt='Vista previa de la imagen' loading='lazy' />}
        {isLoading && (
          <div className='IPreviewImage-image__progress' style={{ width: `${progress}%` }} />
        )}
      </div>
    </aside>
  )
}

export default PreviewImage
