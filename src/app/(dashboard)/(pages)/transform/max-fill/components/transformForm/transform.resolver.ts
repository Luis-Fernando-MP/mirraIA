import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const notFileMessage = '🤖 Sube un archivo en formato (PNG, JPG, JPEG o WEBP)'
const fileSchema = z.instanceof(File, { message: notFileMessage }).refine(
  file => {
    const validTypes = ['image/png', 'image/jpeg', 'image/webp']
    return validTypes.includes(file.type)
  },
  { message: notFileMessage }
)

const transformValidator = z.object(
  {
    title: z
      .string()
      .min(5, {
        message: '⚠️ Mínimo 5 caracteres'
      })
      .regex(/^[a-zA-Z0-9\s,ñÑáéíóúÁÉÍÓÚüÜ]*$/, {
        message: '🚫 Solo se aceptan letras, números, espacios y ","'
      })
      .max(50, {
        message: '📏 Máximo 50 caracteres'
      }),
    tags: z.string().regex(/^([\wñÑáéíóúÁÉÍÓÚüÜ]+)(,\s*[\wñÑáéíóúÁÉÍÓÚüÜ]+)*$/, {
      message:
        '🏷️ Deben de estar separadas por comas sin espacios adicionales (p.ejm, "etiqueta1,etiqueta2")'
    }),
    author: z
      .string()
      .regex(/^[a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚüÜ]*$/, {
        message: '🚫 Solo se aceptan letras, números y espacios'
      })
      .max(50, {
        message: '📏 Máximo 50 caracteres'
      }),
    visibility: z.enum(['public', 'private'], {
      message: '🔒 Solo "publico" o "privado"'
    }),
    publicId: z
      .string()
      .min(5, {
        message: '⚠️ Mínimo 5 caracteres'
      })
      .max(200, {
        message: '📏 Máximo 200 caracteres'
      }),
    image: fileSchema // <-- Type file
  },
  {
    description: '🔍 Filtros para el formulario de transformación de imágenes'
  }
)

export type ITransformResolver = z.infer<typeof transformValidator>
export const transformResolver = zodResolver(transformValidator)
