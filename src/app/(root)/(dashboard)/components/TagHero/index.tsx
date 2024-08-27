import Chest from '@/shared/ui/icons/Chest'
import type { JSX } from 'react'

import './tagHero.scss'

const TagHero = (): JSX.Element => {
  return (
    <div className='tagHero'>
      <div className='tagHero-credits'>
        <Chest />
        <p>15/50</p>
      </div>
      <h3 className='tagHero-tag'>Hero</h3>
    </div>
  )
}

export default TagHero
