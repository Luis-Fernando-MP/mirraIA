import IImage from '@/db/types/image.type'
import { subtractDate } from '@/shared/lib/date'
import { FilterQuery } from 'mongoose'

const imagesFilter: IImagesFilter = {
  community: {
    tag: () => '🌍 Comunidad Pública',
    query: () => ({
      visibility: 'public'
    })
  },
  onlyMe: {
    tag: (author: string) => `👤 Mis Publicaciones (Autor: ${author})`,
    query: (author: string) => ({
      author
    })
  },
  popular: {
    tag: (min: number = 100) => `🔥 Con más de ${min} visitas`,
    query: (min: number = 100) => ({ visibility: 'public', views: { $gt: min } })
  },
  byTransformationType: {
    tag: (type: string) => `🛠️ Transformación: ${type}`,
    query: (type: string) => ({ transformationType: type })
  },
  recentAt: {
    tag: (days: number) => `🕰️ En los últimos: ${days} días`,
    query: (days: number) => {
      return { createdAt: { $gte: subtractDate(days).getTime() } }
    }
  },
  byTags: {
    tag: (tags: string[]) => `🏷️ Etiquetas: ${tags.join(', ')}`,
    query: (tags: string[]) => ({ tags: { $in: tags } })
  },
  byTitle: {
    tag: (title: string) => `📜 Contiene Título: ${title}`,
    query: (title: string) => ({ title: { $regex: title, $options: 'i' } })
  }
}

export default imagesFilter

export type TImagesQuery = FilterQuery<IImage>

interface IImagesFilter {
  community: {
    tag: () => string
    query: () => TImagesQuery
  }
  onlyMe: {
    tag: (author: string) => string
    query: (author: string) => TImagesQuery
  }
  popular: {
    tag: (min?: number) => string
    query: (min?: number) => TImagesQuery
  }
  byTransformationType: {
    tag: (type: string) => string
    query: (type: string) => TImagesQuery
  }
  recentAt: {
    tag: (days: number) => string
    query: (days: number) => TImagesQuery
  }
  byTags: {
    tag: (tags: string[]) => string
    query: (tags: string[]) => TImagesQuery
  }
  byTitle: {
    tag: (title: string) => string
    query: (title: string) => TImagesQuery
  }
}

export type TFilterKeys =
  | 'community'
  | 'onlyMe'
  | 'popular'
  | 'byTransformationType'
  | 'recentAt'
  | 'byTags'
  | 'byTitle'
