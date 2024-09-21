import { acl } from '@/shared/lib/activeClass'
import { ESTATE } from '@/shared/lib/constants'
import type { JSX } from 'react'

import './style.scss'

const BigButton = ({ state = ESTATE.SLATE }: { state: ESTATE }): JSX.Element => {
  return (
    <button
      type='submit'
      className={`bigButton ${acl(state === ESTATE.LOADING, 'disable')}`}
      disabled={state === ESTATE.LOADING || state === ESTATE.ERROR}
    >
      <h2>Transformar ✨</h2>
      <h4>
        Presiona para guardar tu imagen en tu cuenta junto con la transformación aplicada. Podrás
        acceder y gestionar tus imágenes y cambios fácilmente en cualquier momento
      </h4>
    </button>
  )
}

export default BigButton
