'use client'

import { acl } from '@/shared/lib/activeClass'
import { MAX_FILE_SIZE } from '@/shared/lib/constants'
import AnimatedBorderBox from '@/shared/ui/animatedBorderBox'
import { type JSX, type ReactNode } from 'react'
import Dropzone from 'react-dropzone'

import PreviewImage from '../PreviewImage/'
import './style.scss'
import useDropzone from './useDropzone'
import './userMobile.scss'

interface IDropzone {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  setPublicIdField: (file: File, temporalLink: string) => void
}

const CustomDropzone = ({ setPublicIdField }: IDropzone): JSX.Element => {
  const {
    loading,
    preview,
    progress,
    handleRejectFiles,
    handleDrop,
    handleError,
    handleClear,
    getDropzoneMessage
  } = useDropzone({ set: setPublicIdField })

  return (
    <Dropzone
      onDrop={handleDrop}
      multiple={false}
      accept={{ 'image/png': [], 'image/jpeg': [], 'image/jpg': [], 'image/webp': [] }}
      onDropRejected={handleRejectFiles}
      onError={handleError}
      noClick
      maxSize={MAX_FILE_SIZE}
    >
      {({ getRootProps, getInputProps, open, isDragActive }) => {
        return (
          <div {...getRootProps()} className='customDropzone'>
            <input {...getInputProps()} />
            <AnimatedBorderBox className={`${acl(isDragActive)} customDropzone-content`}>
              <h3 className='customDropzone-tag'>{getDropzoneMessage(isDragActive)}</h3>
              <h3>{!isDragActive && 'Arrastra y '}Suelta tu Imagen Aquí 📥</h3>
              <p>
                Simplemente arrastra tu imagen a esta área para cargarla. Puedes soltarla aquí
                <br /> para comenzar el proceso de transformación.
              </p>
              {!preview && !loading && (
                <>
                  {!isDragActive && (
                    <button
                      className='customDropzone-choseFile'
                      type='button'
                      onClick={open}
                      onDragOver={e => e.stopPropagation()}
                    >
                      Prefiero seleccionar un archivo 📁
                    </button>
                  )}
                  {isDragActive && (
                    <h4 className='customDropzone-dropHere'>👋 Hey por aca, suéltalo vamos!! 🏁</h4>
                  )}
                </>
              )}
              {loading && <PreviewImage isLoading={loading} progress={progress} />}
              {preview && !loading && (
                <PreviewImage
                  imagePreview={preview}
                  closePreview={handleClear}
                  openDirectory={open}
                />
              )}
            </AnimatedBorderBox>
          </div>
        )
      }}
    </Dropzone>
  )
}

export default CustomDropzone
