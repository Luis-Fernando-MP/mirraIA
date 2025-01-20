'use client'

import { IGetAllImage } from '@/db/actions/image.action'
import { rlvTime } from '@/shared/lib/time'
import CldImageComponent from '@/shared/ui/CldImageComponent'
import 'dayjs/locale/es'
import Image from 'next/image'
import Link from 'next/link'
import { type JSX, type ReactNode } from 'react'

import './style.scss'

interface IPublication {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  publication: IGetAllImage
}

const Publication = ({ publication }: IPublication): JSX.Element => {
  const { id, publicId, transformationType, author, updatedAt, title } = publication
  const { photo, username, firstName } = author
  const userName = username ?? firstName ?? ''
  return (
    <Link href={`/transform/result/${String(id)}`} className='dPublication animate-slide-in-bottom'>
      <CldImageComponent publicId={publicId} alt={title} className='dPublication-image' />
      <p className='dPublication-transformation'>{transformationType}</p>
      <button className='dPublication-user'>
        <Image src={photo} alt={userName} width={30} height={30} />
        <div className='dPublication-user__info'>
          <h4>{userName}</h4>
          <p>{rlvTime(updatedAt)}</p>
        </div>
      </button>
    </Link>
  )
}

export default Publication
