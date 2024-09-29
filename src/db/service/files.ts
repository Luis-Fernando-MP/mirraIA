import { Image, Prisma } from '@prisma/client'
import axios from 'axios'

export interface IGetUserFiles {
  where: Prisma.ImageWhereInput
  limit?: number
  page?: number
}

export const getUserFiles = async (image: IGetUserFiles) => {
  try {
    const { where, limit = 10, page = 1 } = image
    const response = await axios.get(`/api/files?limit=${limit}&page=${page}`, {
      params: { where }
    })
    if (!response.data) throw new Error('No files found')
    return response.data as Image[]
  } catch (error: any) {
    console.error(error)
  }
}
