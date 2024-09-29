import prisma from '@/db'
import { ITransformPostImage } from '@/db/service/image'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { uploadLinkImage } from '../utils/cld'
import { getTopCompatibleColors } from '../utils/getTopCompatibleColors'

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ITransformPostImage
    const user = auth()
    if (!user || !data) throw new Error('missing props')
    const cldTransformImage = await uploadLinkImage({
      author: Number(data.authorId),
      url: data.transformUrl,
      nameInit: 'transform-'
    })
    const top5Colors = getTopCompatibleColors(cldTransformImage.colors)
    const transformImage = await prisma.image.update({
      where: {
        id: Number(data.imageId)
      },
      data: {
        temporalUrlTransformFile: null,
        transformationUrl: cldTransformImage.public_id,
        colors: top5Colors
      }
    })
    if (!transformImage) throw new Error('Error saving transform image')
    return NextResponse.json(transformImage)
  } catch (error: any) {
    console.log(error)
    return new Response(`Internal Error: ${String(error.message)}`, { status: 500 })
  }
}
