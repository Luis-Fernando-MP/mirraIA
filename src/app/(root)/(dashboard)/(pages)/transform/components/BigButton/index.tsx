import type { JSX } from 'react'

import './style.scss'

const BigButton = (): JSX.Element => {
  return (
    <button type='submit' className='bigButton'>
      <h2>Transformar ✨</h2>
      <h4>
        Presiona para guardar tu imagen en tu cuenta junto con la transformación aplicada. Podrás
        acceder y gestionar tus imágenes y cambios fácilmente en cualquier momento
      </h4>
    </button>
  )
}

export default BigButton
