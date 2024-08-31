'use client'

import Image from 'next/image'
import { type JSX, type ReactNode, useState } from 'react'
import Dropzone from 'react-dropzone'

interface IDropzone {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  setPublicIdField: (file: File, temporalLink: string) => void
}

const CustomDropzone = ({ setPublicIdField }: IDropzone): JSX.Element => {
  const [preview, setPreview] = useState<string | null>(null)

  const handleDrop = (file: File[] | null) => {
    if (file && file?.length > 0) {
      const image = file[0]
      const previewUrl = URL.createObjectURL(image)
      setPreview(previewUrl)
      setPublicIdField(image, previewUrl)
    }
  }

  return (
    <Dropzone
      onDrop={handleDrop}
      multiple={false}
      accept={{ 'image/png': [], 'image/jpeg': [], 'image/webp': [] }}
    >
      {({ getRootProps, getInputProps, open, isDragActive }) => (
        <section className='m-4 h-auto min-h-80 bg-blue-200 p-4' {...getRootProps()}>
          {!preview && (
            <section>
              <div className='flex h-full flex-col items-center justify-center'>
                <input {...getInputProps()} />
                <button
                  type='button'
                  onClick={open}
                  className='mb-2 rounded bg-blue-500 p-2 text-white'
                >
                  Open
                </button>
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </section>
          )}
          {preview && (
            <div className='mt-4'>
              <p>Preview:</p>
              <Image
                src={preview}
                width={150}
                height={150}
                alt='Preview'
                className='mt-2 h-auto max-w-full object-contain'
              />
            </div>
          )}
        </section>
      )}
    </Dropzone>
  )
}

export default CustomDropzone
