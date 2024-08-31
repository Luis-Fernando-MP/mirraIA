'use server'

import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import type { JSX } from 'react'

import { getMeme } from './getMeme'
import './style.scss'

/* eslint-disable @next/next/no-img-element */

const Meme = async (): Promise<JSX.Element> => {
  noStore()
  try {
    const data = await getMeme()
    const { author, url, title, postLink } = data
    return (
      <Link href={postLink} className='meme' rel='noopener noreferrer' target='_blank'>
        <h3 className='meme-info'>Alégrate un rato 😄</h3>
        <img className='meme-image' src={url} loading='lazy' alt={title} />
        <h3 className='meme-title'>{title}</h3>
        <p className='meme-author'>{author}</p>
      </Link>
    )
  } catch (error) {
    return <p>fail to load meme</p>
  }
}

export default Meme
