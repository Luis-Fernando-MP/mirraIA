export const handleError = (error: any) => {
  console.error(error?.message || error)
  throw new Error(`💀: ${JSON.stringify(error)}`)
}

export function generateImageName(userId?: string) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const randomCharsLength = 30
  let randomChars = ''
  for (let i = 0; i < randomCharsLength; i++) {
    randomChars += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  const name = `${userId ?? 'img'}/${Date.now()}-${randomChars}`
  return {
    name,
    startChars: userId,
    dateChars: Date.now(),
    randomChars
  }
}
