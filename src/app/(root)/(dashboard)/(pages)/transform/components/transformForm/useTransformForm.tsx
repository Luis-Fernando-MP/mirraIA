import userStore from '@/app/(root)/(dashboard)/user.state'
import { ESTATE } from '@/shared/lib/constants'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ITransformResolver, transformResolver } from './transform.resolver'

const useTransformForm = () => {
  const user = userStore()
  const [loading, setLoading] = useState<ESTATE>(ESTATE.SLATE)
  const { register, handleSubmit, formState, setValue, watch, trigger } =
    useForm<ITransformResolver>({
      mode: 'onChange',
      resolver: transformResolver,
      defaultValues: {
        tags: 'nuevo,restauración',
        title: 'Titulo de ejemplo',
        visibility: 'public'
      }
    })
  const { errors: err } = formState

  useEffect(() => {
    if (!user) return
    const { firstName, lastName, username } = user
    const author = `${String(firstName ?? username)} ${lastName ?? ''}`
    setValue('author', author)
  }, [setValue, user])

  const onError = (): void => {
    console.error('Error: ', err)
  }

  const onSubmit = async (data: ITransformResolver) => {
    setLoading(ESTATE.LOADING)
    const { author, image, publicId, tags, title, visibility } = data
    const formData = new FormData()

    formData.append('title', title)
    formData.append('transformationType', 'restore')
    formData.append('visibility', visibility)
    formData.append('publicId', publicId)
    formData.append('tags', tags)
    formData.append('authorEditor', author)
    formData.append('author', String(user.id))
    formData.append('image', image)

    const toastId = toast.loading('Cargando...', { id: 'transformImage' })

    try {
      const response = await axios.post('/api/transform/image', formData)
      console.info('response', response)
      toast.success('Tus imágenes sean cargado', {
        id: toastId
      })
    } catch (error: any) {
      setLoading(ESTATE.ERROR)
      toast.error('Algo a salido mal ', { id: toastId })
      console.error(error?.message)
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data)
      }
    } finally {
      setLoading(ESTATE.SLATE)
    }
  }

  return {
    handleSubmit,
    onSubmit,
    onError,
    register,
    watch,
    loading,
    err,
    setValue,
    trigger
  }
}

export default useTransformForm
