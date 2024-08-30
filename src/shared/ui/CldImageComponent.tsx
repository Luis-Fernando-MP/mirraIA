import type { JSX } from 'react'

import { CLD_URL } from '../lib/constants'

interface ICldImageComponent {
  publicId: string
  alt: string
  width?: number
  height?: number
  className?: string
}

const CldImageComponent = ({
  publicId,
  alt,
  className = '',
  height = 170,
  width = 200
}: ICldImageComponent): JSX.Element => {
  const imageUrl = `${CLD_URL}/${publicId}`

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      loading='lazy'
    />
  )
}

export default CldImageComponent
