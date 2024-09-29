import cloudinary from '@/shared/cloudinaryConfig'
import { CLD_FOLDER } from '@/shared/lib/constants'
import { UploadApiOptions } from 'cloudinary'
import { randomUUID } from 'crypto'
import { Stream } from 'stream'

import { CldImageResponse } from '../image/responseCld.type'

interface ISaveImage {
  url: string
  author: number
  nameInit?: string
  options?: UploadApiOptions
}
export const uploadLinkImage = async ({ url, author, nameInit = '', options }: ISaveImage) => {
  try {
    const saveImage = await cloudinary.uploader.upload(url, {
      colors: true,
      public_id: `${CLD_FOLDER}/user-${author}/${nameInit}${randomUUID()}`,
      ...options
    })
    if (!saveImage) throw new Error('Error saving image')
    return saveImage as CldImageResponse
  } catch (error: any) {
    throw new Error(error)
  }
}

interface IUploadCloudinaryStream {
  author: number
  arrayBuffer: ArrayBuffer
}
export const uploadCloudinaryStream = async ({
  author,
  arrayBuffer
}: IUploadCloudinaryStream): Promise<CldImageResponse> => {
  const buffer = Buffer.from(arrayBuffer)
  const tmpID = `${CLD_FOLDER}/user-${author}/${randomUUID()}`
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

export const uploadCloudinaryBase64 = async ({
  author,
  arrayBuffer
}: IUploadCloudinaryStream): Promise<CldImageResponse> => {
  try {
    const buffer = Buffer.from(arrayBuffer)
    const tmpID = `${CLD_FOLDER}/user-${String(author)}/${randomUUID()}`

    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${buffer.toString('base64')}`,
      {
        colors: true,
        public_id: tmpID
      }
    )
    if (!uploadResponse) throw new Error('Error saving image')
    return uploadResponse as CldImageResponse
  } catch (error: any) {
    throw new Error(error)
  }
}
