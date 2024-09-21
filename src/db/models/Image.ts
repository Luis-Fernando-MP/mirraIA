import { Model, Schema, model, models } from 'mongoose'

import IImage from '../types/image.type'

const ImageSchema = new Schema<IImage>({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  prompt: { type: String },
  colors: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  authorEditor: { type: String, default: '' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },

  publicId: { type: String, required: true },
  transformationUrl: { type: String },
  views: { type: Number, default: 0 },

  bytes: { type: Number, default: 0 },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },

  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
})

ImageSchema.index({ title: 1 })
ImageSchema.index({ tags: 1 })
ImageSchema.index({ author: 1 })

const Image: Model<IImage> = models?.Image || model('Image', ImageSchema)

export default Image
