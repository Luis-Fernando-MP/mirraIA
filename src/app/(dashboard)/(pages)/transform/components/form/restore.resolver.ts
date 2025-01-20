import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const restoreValidator = z.object(
  {
    title: z
      .string()
      .min(5, {
        message: 'Debes de ingresar un titulo con mas de 5 caracteres'
      })
      .regex(/^[a-zA-Z0-9\s]*[.,]?$/, {
        message: 'Solo se aceptan cadenas de texto, números, "," y "."'
      })
      .max(50, {
        message: 'Tu titulo no debe de exceder los 50 caracteres'
      }),
    // aspectRatio: z.string({
    //   message: '¿Qué aspecto para tu imagen usaremos?'
    // }),
    // color: z.string({
    //   message: 'Um... que color debemos de emplear'
    // }),
    // prompt: z.string({
    //   message: 'Ingresa tu prompt'
    // }),
    publicId: z.string().min(5, {
      message: 'Deberías de subir una imagen'
    }),
    image: z.any().optional()
  },
  { description: 'filtros para el formulario de restore image' }
)

export type IRestoreValidator = z.infer<typeof restoreValidator>
export const restoreResolver = zodResolver(restoreValidator)
