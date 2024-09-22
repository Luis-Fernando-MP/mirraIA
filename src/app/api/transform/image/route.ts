import { addImage } from '@/db/actions/image.action'
import cloudinary from '@/shared/cloudinaryConfig'
import { NextResponse } from 'next/server'

import { ITransformFormData } from './responseCld.type'
import { uploadCloudinaryBase64 } from './utils/cld'
import { getTopCompatibleColors } from './utils/getTopCompatibleColors'
import { imageQuality } from './utils/qualitiesTransform'

export async function POST(req: Request) {
  try {
    const reqForm = await req.formData()
    const data: ITransformFormData = Object.fromEntries(reqForm.entries()) as any
    const { title, transformationType, visibility, authorEditor, tags, author } = data
    const userId = Number(author)

    const arrayBuffer = await data.image.arrayBuffer()
    const saveImage = await uploadCloudinaryBase64({ author: userId, arrayBuffer })
    const temporalUrlTransformFile = cloudinary.url(saveImage.public_id, {
      transformation: [...imageQuality]
    })
    const top5Colors = getTopCompatibleColors(saveImage.colors)
    const imageModel = await addImage({
      userId,
      image: {
        authorEditor,
        authorId: userId,
        bytes: saveImage.bytes,
        colors: top5Colors,
        height: saveImage.height,
        prompt: 'Restore image',
        publicId: saveImage.public_id,
        tags,
        temporalUrlTransformFile,
        title,
        transformationType,
        transformationUrl: null,
        views: 0,
        visibility,
        width: saveImage.width
      }
    })
    if (!imageModel) throw new Error('Error saving image')
    return NextResponse.json({ saveImage })
  } catch (error: any) {
    console.log(error)
    return new Response(`Internal Error: ${String(error.message)}`, { status: 500 })
  }
}
