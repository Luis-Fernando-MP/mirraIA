import prisma from '@/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import TransformResult from '../../components/transformResult'

interface IResult {
  params: { photoId: string }
}

const Page = async ({ params }: IResult) => {
  const imageId = params.photoId
  if (!Number(imageId)) return redirect('/')

  const image = await prisma.image.findUnique({
    where: {
      id: Number(imageId),
      AND: [
        {
          author: {
            clerkId: String(auth().userId)
          }
        }
      ]
    }
  })

  if (!image) return redirect('/')

  return (
    <>
      <h1>Analicemos los resultados 🔍</h1>
      <h4 className='restore-description'>
        Tómate un momento para explorar tu imagen transformada. Si te
        <br /> encanta, guárdala en tu dispositivo o comparte el enlace si es pública.
      </h4>
      <TransformResult image={image} />
    </>
  )
}

export default Page
