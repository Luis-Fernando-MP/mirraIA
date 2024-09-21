'use client'

import { acl } from '@/shared/lib/activeClass'
import Link from 'next/link'
import { type JSX } from 'react'

import BigButton from '../BigButton'
import CustomDropzone from '../form/Dropzone'
import './style.scss'
import useTransformForm from './useTransformForm'
import './userMobile.scss'

const inputValues = {
  title: {
    tag: 'Título 📝',
    placeholder: 'Titulo de Ejemplo'
  },
  tags: {
    tag: 'Etiqueta(s) 🔖',
    placeholder: 'Ejemplo, nuevo'
  },
  author: {
    tag: 'Autor ✍️',
    placeholder: 'Autor modificado'
  }
}

const TransformForm = (): JSX.Element => {
  const { handleSubmit, onSubmit, onError, register, watch, err, setValue, trigger, loading } =
    useTransformForm()

  return (
    <form className='dsTransform' onSubmit={handleSubmit(onSubmit, onError)}>
      <article className='dsTransform-article requirements'>
        {Object.entries(inputValues).map(([k, v]) => {
          const { placeholder, tag } = v
          return (
            <div key={k} className={`dsTransform-control ${acl(!!err[k as 'title'], 'error')}`}>
              <p className='dsTransform-control__error'>{err[k as 'title']?.message}</p>
              <div className='dsTransform-input'>
                <h4 className='dsTransform-input__tag'>{tag}</h4>
                <input
                  type='search'
                  className='dsTransform-input__field'
                  autoComplete='off'
                  placeholder={placeholder}
                  {...register(k as any)}
                />
              </div>
            </div>
          )
        })}

        <div className={`dsTransform-control ${acl(!!err.visibility, 'error')}`}>
          <p className='dsTransform-control__error'>{err.visibility?.message}</p>
          <div className='dsTransform-input'>
            <h4 className='dsTransform-input__tag'>Acceso 🏁</h4>
            <select className='dsTransform-input__field' {...register('visibility')}>
              <option value='public'>🌍 Público</option>
              <option value='private'>🔒 Privado</option>
            </select>
          </div>
        </div>
        <div className='dsTransform-input link'>
          <h4 className='dsTransform-input__tag'>Link temporal ⏳</h4>
          <Link
            href={watch('publicId') ?? '/'}
            className='dsTransform-input__link'
            target='_blank'
            rel='noopener noreferrer'
          >
            {watch('publicId')}
          </Link>
        </div>
        <BigButton state={loading} />
      </article>
      <article className={`dsTransform-article dropzone ${acl(!!err.image, 'error')}`}>
        {err.image && <p className='dsTransform-control__error'>{err.image?.message}</p>}
        <CustomDropzone
          setPublicIdField={(image, temporalLink) => {
            setValue('image', image)
            setValue('publicId', temporalLink)
            trigger('image')
          }}
        />
      </article>
    </form>
  )
}

export default TransformForm
