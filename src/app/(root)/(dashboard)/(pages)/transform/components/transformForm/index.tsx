'use client'

import userStore from '@/app/(root)/(dashboard)/user.state'
import { acl } from '@/shared/lib/activeClass'
import { PASTEL_COLORS } from '@/shared/lib/constants'
import { toast } from '@pheralb/toast'
import Link from 'next/link'
import { type JSX, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import BigButton from '../BigButton'
import CustomDropzone from '../form/Dropzone'
import './style.scss'
import { ITransformResolver, transformResolver } from './transform.resolver'
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
  const user = userStore()
  const { register, handleSubmit, formState, setValue, watch, trigger } =
    useForm<ITransformResolver>({
      mode: 'onChange',
      resolver: transformResolver,
      defaultValues: {
        tags: 'nuevo,restauración',
        title: 'Titulo de ejemplo',
        visibility: 'public',
        color: PASTEL_COLORS.white.join()
      }
    })
  const { errors: err } = formState
  const color = watch('color')
  useEffect(() => {
    const values = color.split(',')
    if (!Array.isArray(values)) return
    const parent = document.querySelector('body')
    if (!parent || !(parent instanceof HTMLElement)) return
    const [from, to] = values
    parent.style.background = `radial-gradient(
      circle at 20% 0%,
      var(--bg-primary) 10%,
      ${from} 80%,
      ${to} 100%
    )`
    return () => {
      parent.style.background = 'var(--bg-secondary)'
    }
  }, [color])

  useEffect(() => {
    if (!user) return
    const { firstName, lastName, username } = user
    const author = `${firstName ?? username} ${lastName ?? ''}`
    setValue('author', author)
  }, [setValue, user])

  const onError = (): void => {
    console.error('Error: ', err)
  }

  const onSubmit = async (data: ITransformResolver) => {
    console.log('submit ', data)
    toast.loading({
      text: 'Cargando'
    })
  }

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
        <div className={`dsTransform-control ${acl(!!err.color, 'error')}`}>
          <p className='dsTransform-control__error'>{err.color?.message}</p>
          <div className='dsTransform-input color'>
            <h4 className='dsTransform-input__tag'>Color 🎨</h4>
            <aside className='dsTransform-input__colors'>
              {Object.values(PASTEL_COLORS).map(color => {
                const [from, to] = color
                const bg = `linear-gradient(135deg, ${from}, ${to})`
                return (
                  <label key={from} style={{ backgroundImage: bg }}>
                    <input type='radio' value={color.join()} {...register('color')} />
                  </label>
                )
              })}
            </aside>
          </div>
        </div>
        <BigButton />
      </article>
      <article className={`dsTransform-article dropzone ${acl(!!err.image, 'error')}`}>
        {err.image && <p className='dsTransform-control__error'>{err.image?.message}</p>}
        <CustomDropzone
          setPublicIdField={(image, temporalLink) => {
            setValue('image', image)
            setValue('publicId', temporalLink)
            trigger('image')
            console.log(image, temporalLink)
          }}
        />
      </article>
    </form>
  )
}

export default TransformForm
