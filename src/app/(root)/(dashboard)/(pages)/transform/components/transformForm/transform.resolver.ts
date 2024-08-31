import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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
    color: z
      .string({
        message: '🎨 Elije un color valido'
      })
      .min(15, {
        message: '⚠️ La cantidad de caracteres es invalido'
      })
      .max(15, {
        message: '📏 La cantidad de caracteres es invalido'
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
      })
  },
  {
    description: '🔍 Filtros para el formulario de transformación de imágenes'
  }
)

export type ITransformResolver = z.infer<typeof transformValidator>
export const transformResolver = zodResolver(transformValidator)
