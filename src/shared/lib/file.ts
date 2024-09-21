// src/shared/fileUtils.ts
import fs from 'fs/promises'

/**
 * Verifica si un archivo o directorio existe.
 *
 * @param {string} filePath - La ruta completa al archivo o directorio que se desea verificar.
 * @returns Retorna `true` si el archivo/directorio existe, de lo contrario `false`.
 */
export async function exists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * Crea un directorio si no existe.
 *
 * @param {string} dirPath - La ruta completa del directorio que se desea asegurar que exista.
 */
export async function ensureDirectory(dirPath: string) {
  const dirExists = await exists(dirPath)
  if (!dirExists) {
    await fs.mkdir(dirPath, { recursive: true })
  }
}

/**
 * Escribe un archivo con el contenido proporcionado en formato de buffer.
 *
 * @param {string} filePath - La ruta completa donde se guardará el archivo.
 * @param {Buffer} buffer - El contenido del archivo en formato `Buffer`
 */
export async function writeFile(filePath: string, buffer: Buffer) {
  await fs.writeFile(filePath, buffer)
}

/**
 * Elimina un archivo de la ruta proporcionada.
 *
 * @param {string} filePath - La ruta completa al archivo que se desea eliminar.
 */
export async function deleteFile(filePath: string) {
  try {
    await fs.unlink(filePath)
  } catch (err) {
    console.error(`Error deleting file: ${filePath}`, err)
  }
}
