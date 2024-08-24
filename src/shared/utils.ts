export const handleError = (error: any) => {
  console.error(error?.message || error)
  throw new Error(`💀: ${JSON.stringify(error)}`)
}
