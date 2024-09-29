import axios from 'axios';
import toast from 'react-hot-toast';


export async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Copiado')
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error)
  }
}

export async function downloadImage(link: string, name: string) {
  try {
    const response = await axios({
      url: link,
      method: 'GET',
      responseType: 'blob'
    })
    if (response.status !== 200) throw new Error('fail to download image')


    const url = window.URL.createObjectURL(new Blob([response.data]))
    const $anchor = document.createElement('a')
    $anchor.href = url
    $anchor.download = name
    document.body.appendChild($anchor)
    $anchor.click()
    document.body.removeChild($anchor)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error al descargar la imagen:', error)
  }
}