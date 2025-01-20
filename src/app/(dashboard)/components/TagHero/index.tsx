import type { JSX } from 'react'

import './tagHero.scss'
import { Sparkles } from 'lucide-react'

const TagHero = (): JSX.Element => {
  return (
    <div className='tagHero'>
      <div className='tagHero-credits'>
        <Sparkles />
        <p>15/50</p>
      </div>
      <h3 className='tagHero-tag'>Hero</h3>
    </div>
  )
}

export default TagHero
