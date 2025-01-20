'use client'

import { useSaveTransformImage } from '@/db/hooks/useImages'
import { copyTextToClipboard, downloadImage } from '@/shared/lib/clipboard'
import { CLD_URL } from '@/shared/lib/constants'
import CldImageComponent from '@/shared/ui/CldImageComponent'
import { Image } from '@prisma/client'
import { CloudDownload, CopyIcon } from 'lucide-react'
import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import toast from 'react-hot-toast'
import 'two-up-element'

import BigButton from '../BigButton'
import ImageLoader from '../ImageLoader'
import './style.scss'

interface ITransformResult {
  children?: Readonly<ReactNode[]> | null
  image: Image
}

const TransformResult = ({ image }: ITransformResult): JSX.Element => {
  const { mutateAsync } = useSaveTransformImage()
  const imgTransform = String(image.temporalUrlTransformFile)

  const handleSaveTransformImage = async () => {
    const toastId = toast.loading('Guardando tu imagen transformada 🚀', { id: 'IMG_TRANSFORM' })
    try {
      await mutateAsync({
        imageId: Number(image.id),
        transformUrl: imgTransform,
        authorId: Number(image.authorId)
      })
      toast.success('Guardado correctamente', { id: toastId })
    } catch (error) {
      console.log(error)
      toast.success('Error al guardar la imagen', { id: toastId })
    }
  }

  return (
    <section className='tfResult'>
      <article className='tfResult-info'>
        <div className='tfResult-control'>
          <h4 className='tfResult-control__tag'>Título 📝</h4>
          <p className='tfResult-control__field'>{image.title}</p>
        </div>
        <div className='tfResult-control'>
          <h4 className='tfResult-control__tag'>Autor ✍️</h4>
          <p className='tfResult-control__field'>{image.authorEditor}</p>
        </div>
        <div className='tfResult-control'>
          <h4 className='tfResult-control__tag'>Acceso 🏁</h4>
          <p className='tfResult-control__field'>{image.visibility}</p>
        </div>
        <div className='tfResult-control tags'>
          <h4 className='tfResult-control__tag'>Etiqueta(s) 🔖</h4>
          <div className='tfResult-control__tags'>
            {image.tags?.split(',').map(tag => <p key={tag}>{tag}</p>)}
          </div>
        </div>
        <div className='tfResult-control links'>
          <h4 className='tfResult-control__tag'>Links 🌐</h4>
          <div className='tfResult-control__link'>
            <button onClick={async () => await copyTextToClipboard(image.publicId)}>
              <CopyIcon />
              <p>Imagen base</p>
            </button>
            <Link href={image.publicId} target='_blank' rel='noopener noreferrer'>
              {image.publicId}
            </Link>
          </div>
          {imgTransform && (
            <div className='tfResult-control__link'>
              <button onClick={async () => await copyTextToClipboard(imgTransform)}>
                <CopyIcon />
                <p>Imagen transformada</p>
              </button>
              <Link href={imgTransform} target='_blank' rel='noopener noreferrer'>
                {imgTransform}
              </Link>
            </div>
          )}
        </div>
        <BigButton title='Guardar Transformación 📸' onClick={handleSaveTransformImage}>
          Asegúrate de que todas tus actualizaciones estén seguras. Haz clic para guardar los
          cambios en tu cuenta y mantener tu información al día.
        </BigButton>
      </article>
      <article
        className='tfResult-twoUp'
        style={{ backgroundImage: `linear-gradient(-45deg, ${String(image.colors)}` }}
      >
        <button
          className='tfResult-twoUp__download'
          onClick={async () =>
            await downloadImage(String(imgTransform), `transform-${image.title}.jpg`)
          }
        >
          <CloudDownload />
        </button>
        <two-up orientation='vertical'>
          <CldImageComponent publicId={image.publicId} alt={String(image.prompt)} />
          <ImageLoader
            imageUrl={String(image.temporalUrlTransformFile)}
            fallback={`${CLD_URL}/${image.publicId}`}
          />
        </two-up>
      </article>
    </section>
  )
}

export default TransformResult
