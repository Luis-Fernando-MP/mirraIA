import Image from '@/db/models/Image'
import User from '@/db/models/User'
import { NextResponse } from 'next/server'

import { ITransformFormData } from './responseCld.type'
import { cldSaveImage, cldSaveTransformImage } from './utils/cld'
import { createTempFile, unlinkTempFile } from './utils/temporalFile'

export async function POST(req: Request) {
  let tempFilePath = ''
  try {
    // const file = await fs.writeFile(process.cwd() + '/app/data.json', 'Hola', { encoding: 'utf8' })
    // console.log('hola --> ', file)

    const reqForm = await req.formData()
    const data: ITransformFormData = Object.fromEntries(reqForm.entries()) as any

    const user = await User.findById({ _id: data.author })
    if (!user) throw new Error('User not found')

    const arrayBuffer = await data.image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    tempFilePath = await createTempFile(buffer)

    const saveImage = await cldSaveImage({ file: tempFilePath, author: data.author })
    const transform = await cldSaveTransformImage({
      publicId: saveImage.public_id,
      author: data.author
    })
    const { title, transformationType, visibility, authorEditor, tags } = data
    const imageModel = await Image.create({
      title,
      transformationType,
      visibility,
      tags: tags.split(','),
      authorEditor: authorEditor ?? user.firstName,
      transformationUrl: transform.publicId,
      author: user,
      publicId: saveImage.public_id,
      bytes: saveImage.bytes,
      width: saveImage.width,
      height: saveImage.height,
      colors: saveImage.colors.flatMap(m => m.join(',')),
      prompt: ''
    })
    if (!imageModel) throw new Error('Error saving image')
    return NextResponse.json({ message: 'OK' })
  } catch (error: any) {
    console.log(error)
    return new Response(`Internal Error: ${String(error.message)}`, { status: 500 })
  } finally {
    unlinkTempFile(tempFilePath)
  }
}
