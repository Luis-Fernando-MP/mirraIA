import { MAX_FILE_SIZE } from '@/shared/lib/constants'
import { toast } from '@pheralb/toast'
import { useState } from 'react'
import { FileRejection } from 'react-dropzone'

interface TUseDropzoneProps {
  set: (image: File, previewUrl: string) => void
}

const useDropzone = ({ set }: TUseDropzoneProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const handleDrop = (files: File[]) => {
    const image = files[0]
    if (image.size > MAX_FILE_SIZE)
      return setError('⚠️ ¡La imagen es demasiado grande! Máximo 10MB.')
    const previewUrl = URL.createObjectURL(image)
    set(image, previewUrl)
    startLoading(previewUrl)
  }

  const startLoading = (previewUrl: string) => {
    setError(null)
    setLoading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 10
        clearInterval(interval)
        setLoading(false)
        setPreview(previewUrl)
        return 100
      })
    }, 40)
  }

  const handleRejectFiles = (files: FileRejection[]) => {
    setLoading(false)
    if (files.length > 0) {
      setError('⚠️ ¡Verifica el formato de tu archivo!')
      files.forEach(({ file }) => {
        if (!/\.(png|jpe?g|webp)$/i.test(file.name)) {
          toast.error({
            text: '🚫 ¡Extensión incorrecta!',
            description: `⚠️ ${file.name} no usa un formato válido (PNG, JPG, JPEG o WEBP).`
          })
        }
      })
    }
  }

  const handleError = (e: Error) => {
    setError(e.message)
    setLoading(false)
    toast.error({
      text: '🚫 ¡Error al subir tu archivo!',
      description: '🔍 Verifica su tamaño y formato.'
    })
  }

  const handleClear = () => {
    setPreview(null)
    setError(null)
    setLoading(false)
    setProgress(0)
    set(new File([], ''), '')
  }

  const getDropzoneMessage = (isDragActive: boolean) => {
    if (isDragActive) return '🚀 ¡Suelta aquí para cargar!'
    if (loading) return '⏳ ¡Cargando, espera un momento!'
    if (error) return '⚠️ ¡Ups, ha ocurrido un error!'
    if (preview) return '👀 ¡Vista previa de tu imagen:'
    return '📤 ¡Carga tu imagen aquí!'
  }

  return {
    loading,
    preview,
    progress,
    error,
    handleRejectFiles,
    handleDrop,
    handleError,
    handleClear,
    getDropzoneMessage
  }
}

export default useDropzone
