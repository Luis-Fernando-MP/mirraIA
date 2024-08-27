'use client'

import type { JSX } from 'react'

import userStore from '../../../user.state'
import Form from './form/Form'

const Restore = (): JSX.Element => {
  const { firstName } = userStore()
  return (
    <div>
      <h2 className='font-bold'>Restaura tu imagen</h2>
      <p>Hey {firstName} 👋!! Refina tus imágenes, quitale los borrones e imperfecciones</p>
      <Form />
    </div>
  )
}

export default Restore
