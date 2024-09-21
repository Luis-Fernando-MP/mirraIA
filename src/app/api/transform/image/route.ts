import Image from '@/db/models/Image'
import User from '@/db/models/User'
import cloudinary from '@/shared/cloudinaryConfig'
import { NextResponse } from 'next/server'

import { ITransformFormData } from './responseCld.type'
import { uploadCloudinaryStream } from './utils/cld'
import { imageQuality } from './utils/qualitiesTransform'

export async function POST(req: Request) {
  try {
    const reqForm = await req.formData()
    const data: ITransformFormData = Object.fromEntries(reqForm.entries()) as any

    const user = await User.findById({ _id: data.author })
    if (!user) throw new Error('User not found')
    console.log('USER ---- ', user)

    const arrayBuffer = await data.image.arrayBuffer()
    const saveImage = await uploadCloudinaryStream({ author: data.author, arrayBuffer })
    const temporalUrlTransformFile = cloudinary.url(saveImage.public_id, {
      transformation: [...imageQuality]
    })
    console.log('temporalUrlTransformFile ---- ', temporalUrlTransformFile)

    const { title, transformationType, visibility, authorEditor, tags } = data
    const imageModel = await Image.create({
      title,
      transformationType,
      visibility,
      tags: tags.split(','),
      authorEditor: authorEditor ?? user.firstName,
      transformationUrl: null,
      temporalUrlTransformFile,
      author: user,
      publicId: saveImage.public_id,
      bytes: saveImage.bytes,
      width: saveImage.width,
      height: saveImage.height,
      colors: saveImage.colors.flatMap(m => m.join(',')),
      prompt: 'Restore image'
    })
    if (!imageModel) throw new Error('Error saving image')
    return NextResponse.json({ message: 'OK' })
  } catch (error: any) {
    console.log(error)
    return new Response(`Internal Error: ${String(error.message)}`, { status: 500 })
  }
}
