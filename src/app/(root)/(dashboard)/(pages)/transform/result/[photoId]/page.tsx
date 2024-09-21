import type { JSX, ReactNode } from 'react'

interface IResult {
  params: { photoId: string }
  children?: Readonly<ReactNode[]> | null
}

const Result = ({ params }: IResult): JSX.Element => {
  const { photoId } = params
  return <section>{photoId}</section>
}

export default Result
