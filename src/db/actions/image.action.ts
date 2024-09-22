'use server'

import { handleError } from '@/shared/lib/utils'
import { Image } from '@prisma/client'
import { FilterQuery } from 'mongoose'

import prisma from '..'

interface IAddImage {
  image: Omit<Image, 'id' | 'createdAt' | 'updatedAt'>
  userId: number
}

export async function addImage({ image, userId }: IAddImage) {
  try {
    console.log(image)

    const author = await prisma.user.findUnique({
      where: { id: userId }
    })
    if (!author) throw new Error('User not found')
    const newImage = await prisma.image.create({
      data: image
    })
    return newImage
  } catch (error) {
    handleError(error)
  }
}

export async function getImageById(imageId: number) {
  try {
    const image = await prisma.image.findUnique({
      where: { id: imageId },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            clerkId: true
          }
        }
      }
    })
    if (!image) throw new Error('Image not found')
    return image
  } catch (error) {
    handleError(error)
  }
}

export interface IGetAllImage extends Omit<Image, 'author'> {
  author: {
    clerkId: string
    planId: number
    username?: string
    firstName?: string
    photo: string
  }
}

export interface IImagesByFilter {
  query: FilterQuery<Image>
  limit?: number
  page?: number
}

export async function getImagesByQuery({ query, limit = 9, page = 1 }: IImagesByFilter) {
  try {
    const pagination = (Number(page) - 1) * limit

    const images = await prisma.image.findMany({
      where: query,
      orderBy: {
        updatedAt: 'desc'
      },
      skip: pagination,
      take: limit,
      include: {
        author: {
          select: {
            clerkId: true,
            planId: true,
            username: true,
            firstName: true,
            photo: true
          }
        }
      }
    })
    const totalImages = await prisma.image.count({
      where: query
    })
    return {
      images: images as IGetAllImage[],
      totalPage: Math.ceil(totalImages / limit)
    }
  } catch (error) {
    console.error('Error fetching user images:', error)
    return { images: [], totalPage: 0 }
  }
}
