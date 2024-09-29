import prisma from '@/db'
import { getImagesByQuery } from '@/db/actions/image.action'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const user = auth()
    if (!user) throw new Error('Please log in')

    const userDB = await prisma.user.findUnique({
      where: { clerkId: String(user.userId) }
    })
    if (!userDB) throw new Error('User not found')

    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit') ?? '10')
    const page = Number(searchParams.get('page') ?? '1')

    // Extraer el parámetro where, y convertirlo a JSON
    const whereParam = searchParams.get('where')
    const where = whereParam ? JSON.parse(whereParam) : {} // Manejar la conversión

    const images = await getImagesByQuery({
      where: { ...where, authorId: userDB.id }, // Combina el where con el authorId
      limit,
      page
    })

    return NextResponse.json(images)
  } catch (error: any) {
    console.log(error)
    return new Response(`Internal Error: ${String(error.message)}`, { status: 500 })
  }
}
