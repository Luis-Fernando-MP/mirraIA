import { acl } from '@/shared/lib/activeClass'
import { ESTATE } from '@/shared/lib/constants'
import type { ButtonHTMLAttributes, JSX } from 'react'

import './style.scss'

interface IBigButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | null
  state?: ESTATE
  title: string
}

const BigButton = ({
  state = ESTATE.SLATE,
  title,
  children,
  ...props
}: IBigButton): JSX.Element => {
  return (
    <button
      type='submit'
      className={`bigButton ${acl(state === ESTATE.LOADING, 'disable')}`}
      disabled={state === ESTATE.LOADING || state === ESTATE.ERROR}
      {...props}
    >
      <h2>{title}</h2>
      <h4>{children}</h4>
    </button>
  )
}

export default BigButton
