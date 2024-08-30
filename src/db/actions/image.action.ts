'use server'

import cloudinary from '@/shared/cloudinaryConfig'
import { handleError } from '@/shared/lib/utils'
import { FilterQuery } from 'mongoose'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import db from '..'
import Image from '../models/Image'
import User from '../models/User'
import { CloudinaryResources } from '../types/image.cloudResponse.type'
import IImage from '../types/image.type'

const populateUser = (query: any) =>
  query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId'
  })

// ADD IMAGE
export async function addImage({
  image,
  userId,
  path
}: {
  image: IImage
  userId: string
  path: string
}) {
  try {
    await db()
    const author = await User.findById(userId)
    if (!author) {
      throw new Error('User not found')
    }
    const newImage = await Image.create({
      ...image,
      author: author._id
    })
    revalidatePath(path)
    return newImage
  } catch (error) {
    handleError(error)
  }
}

// UPDATE IMAGE
export async function updateImage({
  image,
  userId,
  path
}: {
  image: IImage
  userId: string
  path: string
}) {
  try {
    await db()

    const imageToUpdate = await Image.findById(image._id)
    if (!imageToUpdate) {
      throw new Error('Unauthorized or image not found')
    }
    const updatedImage = await Image.findByIdAndUpdate(imageToUpdate._id, image, { new: true })

    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedImage))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteImage(imageId: string) {
  try {
    await db()

    await Image.findByIdAndDelete(imageId)
  } catch (error) {
    handleError(error)
  } finally {
    redirect('/')
  }
}

export async function getImageById(imageId: string) {
  try {
    await db()

    const image = await populateUser(Image.findById(imageId))

    if (!image) throw new Error('Image not found')

    return JSON.parse(JSON.stringify(image))
  } catch (error) {
    handleError(error)
  }
}

export interface IGetAllImage extends Omit<IImage, 'author'> {
  author: {
    clerkId: string
    planId: number
    username?: string
    firstName?: string
    photo: string
  }
}

export async function getResourcesCloudinary(limit: number = 9) {
  const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!
  const cloud = await cloudinary.search
    .expression(`folder:${folder}/*`)
    .max_results(limit)
    .sort_by('public_id', 'desc')
    .execute()
  const resources = cloud.resources as CloudinaryResources[]
  const resourceIds = resources.map((resource: any) => resource.public_id)
  return { resources, resourceIds }
}

interface IImagesByFilter {
  query: FilterQuery<IImage>
  limit?: number
  page?: number
}

export async function getImagesByQuery({ query, limit = 9, page = 1 }: IImagesByFilter) {
  try {
    await db()
    const pagination = (Number(page) - 1) * limit
    const images = await Image.find(query)
      .sort({ updatedAt: -1 })
      .skip(pagination)
      .limit(limit)
      .populate({
        path: 'author',
        model: User,
        select: 'clerkId planId username firstName photo'
      })
    const totalImages = await Image.countDocuments(query)
    return {
      images: JSON.parse(JSON.stringify(images)) as IGetAllImage[],
      totalPage: Math.ceil(totalImages / limit)
    }
  } catch (error) {
    console.error('Error fetching user images:', error)
    return { images: [], totalPage: 0 }
  }
}
