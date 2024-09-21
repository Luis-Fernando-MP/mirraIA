import { NextResponse } from 'next/server'

import { ITransformFormData } from './responseCld.type'
import { uploadCloudinaryBase64 } from './utils/cld'

export async function POST(req: Request) {
  try {
    const reqForm = await req.formData()
    const data: ITransformFormData = Object.fromEntries(reqForm.entries()) as any

    const arrayBuffer = await data.image.arrayBuffer()
    const saveImage = await uploadCloudinaryBase64({ author: data.author, arrayBuffer })
    // const temporalUrlTransformFile = cloudinary.url(saveImage.public_id, {
    //   transformation: [...imageQuality]
    // })

    // const { title, transformationType, visibility, authorEditor, tags } = data
    // const imageModel = await Image.create({
    //   title,
    //   transformationType,
    //   visibility,
    //   tags: tags.split(','),
    //   authorEditor: authorEditor ?? user.firstName,
    //   transformationUrl: null,
    //   temporalUrlTransformFile,
    //   author: user,
    //   publicId: saveImage.public_id,
    //   bytes: saveImage.bytes,
    //   width: saveImage.width,
    //   height: saveImage.height,
    //   colors: saveImage.colors.flatMap(m => m.join(',')),
    //   prompt: 'Restore image'
    // })
    // if (!imageModel) throw new Error('Error saving image')
    return NextResponse.json({ saveImage })
  } catch (error: any) {
    console.log(error)
    return new Response(`Internal Error: ${String(error.message)}`, { status: 500 })
  }
}
