import axios from 'axios'

const MEME_API = 'https://meme-api.com/gimme'

export const getMeme = async () => {
  const req = await axios.get(MEME_API, {
    headers: {
      cache: 'no-store'
    }
  })
  if (req.statusText !== 'OK') throw new Error('fail to load meme')
  return req.data as IGetMeme
}

export interface IGetMeme {
  postLink: string
  title: string
  url: string
  author: string
  preview: string[]
}
