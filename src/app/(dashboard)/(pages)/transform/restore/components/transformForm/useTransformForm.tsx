'use client'

import userStore from '@/app/(dashboard)/user.state'
import { useCreateImage } from '@/db/hooks/useImages'
import { ESTATE } from '@/shared/lib/constants'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ITransformResolver, transformResolver } from './transform.resolver'

const useTransformForm = () => {
  const user = userStore()
  const [loading, setLoading] = useState<ESTATE>(ESTATE.SLATE)
  const { mutateAsync } = useCreateImage()
  const router = useRouter()

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
    const { firstName, lastName, username } = user as any
    const author = `${String(firstName ?? username ?? '')} ${String(lastName ?? '')}`
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
    formData.append('author', String(user.id ?? 0))
    formData.append('image', image)

    const toastId = toast.loading('Cargando...', { id: 'transformImage' })

    try {
      const res = await mutateAsync(formData)
      toast.success('Tus imágenes sean cargado', {
        id: toastId
      })
      if (!res) throw new Error('no information')
      router.push(`/transform/result/${res.id}`)
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
