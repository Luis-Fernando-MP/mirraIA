import { type Document } from 'mongodb'

import IUser from './user.type'

interface IImage extends Document {
  title: string
  transformationType: string
  publicId: string
  secureURL: string
  width?: number
  height?: number
  config?: object
  transformationUrl?: string
  aspectRatio?: string
  color?: string
  prompt?: string
  author: IUser
  createdAt?: Date
  updatedAt?: Date
}

export default IImage
