import { HTMLAttributes, type JSX, type ReactNode } from 'react'

import './style.scss'

type IAnimatedBorderBox = {
  children?: Readonly<ReactNode[]> | null
} & HTMLAttributes<HTMLElement>

const AnimatedBorderBox = ({ children, ...params }: IAnimatedBorderBox): JSX.Element => {
  return (
    <section className='animatedBorderBox'>
      <div {...params} className={`animatedBorderBox-content ${params.className ?? ''}`}>
        {children}
      </div>
    </section>
  )
}

export default AnimatedBorderBox
