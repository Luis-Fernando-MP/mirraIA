import type { JSX } from 'react'

interface IResult {
  params: { photoId: string }
}

const Result = ({ params }: IResult): JSX.Element => {
  const { photoId } = params
  return <section>{photoId}</section>
}

export default Result
