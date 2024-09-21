import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'

export async function saveImg() {
  try {
    const dir = __dirname ?? process.cwd()
    const temporalPath = path.join(dir, 'temp')
    console.log(fs.existsSync(temporalPath))

    if (!fs.existsSync(temporalPath)) fs.mkdirSync(temporalPath)
    const pathImage = path.join(temporalPath, 'a.jpg')
    const image = fs.readFileSync(pathImage)
    const tempFilePath = path.join(temporalPath, `${randomUUID()}.jpg`)
    const wri = fs.writeFileSync(tempFilePath, image)
    console.log(wri)
    setTimeout(() => {
      const de = fs.unlinkSync(tempFilePath)
      console.log(de)
    }, 1000)
  } catch (error: any) {
    console.log(error)
  }
}

saveImg()
