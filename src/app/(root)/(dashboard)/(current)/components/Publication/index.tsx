'use client'

import { IGetAllImage } from '@/db/actions/image.action'
import CldImageComponent from '@/shared/ui/CldImageComponent'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import { type JSX, type ReactNode } from 'react'

import './style.scss'

interface IPublication {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  publication: IGetAllImage
}
dayjs.locale('es')

dayjs.extend(relativeTime)

const Publication = ({ publication }: IPublication): JSX.Element => {
  const { _id, publicId, transformationType, author, updatedAt, title } = publication
  const { photo, username, firstName } = author
  const userName = username ?? firstName ?? ''
  return (
    <Link href={`/image/${String(_id)}`} className='dPublication'>
      <CldImageComponent publicId={publicId} alt={title} className='dPublication-image' />
      <p className='dPublication-transformation'>{transformationType}</p>
      <button className='dPublication-user'>
        <Image src={photo} alt={userName} width={30} height={30} />
        <div className='dPublication-user__info'>
          <h4>{userName}</h4>
          <p>{dayjs(updatedAt).fromNow()}</p>
        </div>
      </button>
    </Link>
  )
}

export default Publication
