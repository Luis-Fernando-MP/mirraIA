import cloudinary from '@/shared/cloudinaryConfig'
import { CLD_FOLDER } from '@/shared/lib/constants'
import { UploadApiOptions } from 'cloudinary'
import { randomUUID } from 'crypto'
import { Stream } from 'stream'

import { CldImageResponse } from '../responseCld.type'

interface ISaveImage {
  url: string
  author: string
  options?: UploadApiOptions
}
export const cldSaveImage = async ({ url, author, options }: ISaveImage) => {
  try {
    const saveImage = await cloudinary.uploader.upload(url, {
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

interface IUploadCloudinaryStream {
  author: string
  arrayBuffer: ArrayBuffer
}
export const uploadCloudinaryStream = async ({
  author,
  arrayBuffer
}: IUploadCloudinaryStream): Promise<CldImageResponse> => {
  const buffer = Buffer.from(arrayBuffer)
  const tmpID = `${CLD_FOLDER}/${author}/transformed-${randomUUID()}`
  return await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        colors: true,
        public_id: tmpID
      },
      (error, result: any) => {
        if (error) return reject(new Error('Error uploading image: ' + error.message))
        resolve(result)
      }
    )

    const passthrough = new Stream.PassThrough()
    passthrough.end(buffer)
    passthrough.pipe(uploadStream)
  })
}
