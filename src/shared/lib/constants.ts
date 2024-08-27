export const IS_PRODUCTION = process.env.NODE_ENV ?? 'development'
export const DB_URL = process.env.MONGODB_URL
export const CLD_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
export const CLD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
