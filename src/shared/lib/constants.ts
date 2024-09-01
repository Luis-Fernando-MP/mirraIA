export const IS_PRODUCTION = process.env.NODE_ENV ?? 'development'
export const DB_URL = process.env.MONGODB_URL

export const CLD_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
export const CLD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
export const CLD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
export const CLD_SECRET = process.env.CLOUDINARY_API_SECRET
export const CLD_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!

export const CLD_URL = `http://res.cloudinary.com/${CLD_NAME!}/image/upload/v1724827405`

export const MAX_FILE_SIZE = 10 * 1024 * 1024

export const PASTEL_COLORS = {
  coral: ['#ff9999', '#ffcccc'],
  green: ['#b3e6b3', '#99cc99'],
  lavender: ['#e0b3e6', '#d6a1e6'],
  lilac: ['#e0c6ff', '#d1a6e6'],
  white: ['#f3f2ff', '#d0d0ee'],
  mint: ['#c2f7e1', '#a1e6d4'],
  peach: ['#ffe5b3', '#ffcc99'],
  pink: ['#ffb3d9', '#ff77a1'],
  sky: ['#b3e0ff', '#99ccff']
}
