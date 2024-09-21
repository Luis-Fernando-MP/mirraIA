import { randomUUID } from 'crypto'
import fs from 'fs'
import 'fs/promises'
import path from 'path'

const dir = process.cwd()
const temporalDir = path.join(dir, 'src/app/api/transform/image', 'temp')

export async function createTempFile(arrayBuffer: ArrayBuffer) {
  const existTempFolder = fs.existsSync(temporalDir)

  const tempFilePath = path.join(temporalDir, `${randomUUID()}.jpg`)
  if (!existTempFolder) fs.mkdirSync(temporalDir)

  const buffer = Buffer.from(arrayBuffer)
  fs.writeFileSync(tempFilePath, buffer)
  return tempFilePath
}

export async function unlinkTempFile(path: string) {
  const existFIle = fs.existsSync(path)
  if (!existFIle) return
  const timer = setTimeout(() => {
    clearTimeout(timer)
    fs.unlinkSync(path)
  }, 10000)
}
