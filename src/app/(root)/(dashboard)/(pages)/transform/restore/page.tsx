import type { JSX } from 'react'

import TransformForm from '../components/transformForm'

const Page = (): JSX.Element => {
  return (
    <>
      <h1>¡Es momento de brillar! 🌟</h1>
      <h4 className='restore-description'>
        Sube tu nueva imagen y personalízala con detalles únicos. Completa los <br /> campos a
        continuación para darle un toque especial a tu foto y <br /> compartirla con el mundo.
      </h4>
      <TransformForm />
    </>
  )
}

export default Page
