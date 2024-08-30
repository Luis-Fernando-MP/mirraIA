export const IS_PRODUCTION = process.env.NODE_ENV ?? 'development'
export const DB_URL = process.env.MONGODB_URL

export const CLD_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
export const CLD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
export const CLD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
export const CLD_SECRET = process.env.CLOUDINARY_API_SECRET
export const CLD_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME!

export const CLD_URL = `http://res.cloudinary.com/${CLD_NAME!}/image/upload/v1724827405`
