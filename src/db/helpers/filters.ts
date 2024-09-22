import { subtractDate } from '@/shared/lib/date'

export type TFilterKeys =
  | 'community'
  | 'onlyMe'
  | 'popular'
  | 'byTransformationType'
  | 'recentAt'
  | 'byTags'
  | 'byTitle'

const imagesFilter = {
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
    query: (min: number = 100) => ({
      visibility: 'public',
      views: { gt: min } // "mayor que"
    })
  },
  byTransformationType: {
    tag: (type: string) => `🛠️ Transformación: ${type}`,
    query: (type: string) => ({
      transformationType: type
    })
  },
  recentAt: {
    tag: (days: number) => `🕰️ En los últimos: ${days} días`,
    query: (days: number) => ({
      createdAt: { gte: subtractDate(days) } // "mayor o igual que"
    })
  },
  byTags: {
    tag: (tags: string[]) => `🏷️ Etiquetas: ${tags.join(', ')}`,
    query: (tags: string[]) => ({
      tags: { hasSome: tags } // "Cualquier etiqueta en la lista"
    })
  },
  byTitle: {
    tag: (title: string) => `📜 Contiene Título: ${title}`,
    query: (title: string) => ({
      title: { contains: title, mode: 'insensitive' }
      // Utilizando "contains" y "insensitive" para búsqueda de texto
    })
  }
}

export default imagesFilter
