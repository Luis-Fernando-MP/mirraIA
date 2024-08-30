'use client'

import { IGetAllImage } from '@/db/actions/image.action'
import { type JSX, type ReactNode, useEffect } from 'react'

import publicationsStore from '../../store/publicationsStore'
import Publication from '../Publication'
import './style.scss'
import './userMobile.scss'

interface ICommunityPublications {
  children?: Readonly<ReactNode[]> | null
  community: { images: IGetAllImage[]; totalPage: number }
}

const CommunityPublications = ({ community }: ICommunityPublications): JSX.Element | null => {
  const { publications, setPubs } = publicationsStore()
  const publicationsIsEmpty = community.images.length < 1

  useEffect(() => {
    if (publicationsIsEmpty) return
    setPubs(community.images)
  }, [community, publicationsIsEmpty, setPubs])

  if (publicationsIsEmpty) return null

  return (
    <div className='dCommunityPubs'>
      {publications.map(img => {
        return <Publication key={img.author.clerkId} publication={img} />
      })}
    </div>
  )
}

export default CommunityPublications
