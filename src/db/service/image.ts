import { Image } from '@prisma/client'
import axios from 'axios'

export const saveImage = async (image: FormData) => {
  try {
    const response = await axios.post('/api/transform/image', image)
    if (!response.data) {
      throw new Error('Error al crear la reserva')
    }
    return response.data as Image
  } catch (error: any) {
    console.error(error)
  }
}

export interface ITransformPostImage {
  transformUrl: string
  imageId: number
  authorId: number
}

export const saveTransformImage = async (image: ITransformPostImage) => {
  try {
    const response = await axios.post('/api/transform/save', image, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.data) {
      throw new Error('Error al crear la reserva')
    }
    return response.data as Image
  } catch (error: any) {
    console.error(error)
  }
}
