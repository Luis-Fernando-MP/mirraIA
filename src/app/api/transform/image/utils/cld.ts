import cloudinary from '@/shared/cloudinaryConfig'
import { CLD_FOLDER } from '@/shared/lib/constants'
import axios from 'axios'
import { UploadApiOptions } from 'cloudinary'
import { randomUUID } from 'crypto'

import { CldImageResponse } from '../responseCld.type'
import { imageQuality } from './qualitiesTransform'
import { createTempFile, unlinkTempFile } from './temporalFile'

interface ISaveImage {
  file: string
  author: string
  options?: UploadApiOptions
}
export const cldSaveImage = async ({ file, author, options }: ISaveImage) => {
  try {
    const saveImage = await cloudinary.uploader.upload(file, {
      colors: true,
      public_id: `${CLD_FOLDER}/${author}/${randomUUID()}`,
      ...options
    })
    if (!saveImage) throw new Error('Error saving image')
    return saveImage as CldImageResponse
  } catch (error: any) {
    throw new Error(error)
  }
}

interface ITransformImage extends Omit<ISaveImage, 'file'> {
  publicId: string
  author: string
  options?: UploadApiOptions
}
export const cldSaveTransformImage = async ({
  publicId,
  author,
  options = {}
}: ITransformImage) => {
  const tmpID = `${CLD_FOLDER}/${author}/transformed-${randomUUID()}`
  let tempFilePath = ''
  try {
    const url = cloudinary.url(publicId, {
      transformation: [...imageQuality],
      ...options
    })

    // Descarga la imagen generado de cld
    // Se uso cloudinary.uploader.upload directamente por el tiempo de demora
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    tempFilePath = await createTempFile(response.data)

    const saveTransformedImage = cloudinary.uploader.upload(tempFilePath, {
      public_id: tmpID
    })

    // Carga la imagen en segundo plano
    Promise.allSettled([saveTransformedImage]).then(results => {
      const [result] = results
      if (result.status === 'rejected') {
        return console.error('Error saving transform image:', result.reason)
      }
    })

    return { publicId: tmpID }
  } catch (error: any) {
    console.log(error.message)
    throw new Error(error)
  } finally {
    unlinkTempFile(tempFilePath)
  }
}
