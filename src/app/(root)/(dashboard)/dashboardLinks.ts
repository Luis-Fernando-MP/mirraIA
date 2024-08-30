import {
  BaggageClaimIcon,
  BookImageIcon,
  HouseIcon,
  MicroscopeIcon,
  PackageMinusIcon,
  ScanSearchIcon,
  SprayCanIcon
} from 'lucide-react'

export type TTransformations =
  | 'restore'
  | 'extra-fill'
  | 'object-remove'
  | 'recolor'
  | 'fill-remove'
  | 'buy-credits'

const dashboardLinks = {
  home: {
    label: 'Inicio',
    route: '/',
    Icon: HouseIcon,
    shortTitle: 'Bienvenido',
    expressionInfo: 'Descubre todas nuestras funcionalidades desde el inicio. 🌟',
    description:
      'La página principal te da acceso a todas nuestras herramientas y servicios. Comienza tu viaje aquí.'
  },
  restore: {
    label: 'Restaurar',
    route: '/transform/restore',
    Icon: MicroscopeIcon,
    shortTitle: 'Restaura tu imagen',
    expressionInfo: '¡Haz que tus recuerdos brillen nuevamente! 🚀📸',
    description:
      'Transforma y revitaliza tus fotos. Recupera la calidad, mejora los detalles y da nueva vida a tus imágenes con solo unos clics.'
  },
  'extra-fill': {
    label: 'Aumentar relleno',
    route: '/transform/max-fill',
    Icon: BookImageIcon,
    shortTitle: 'Maximiza tu imagen',
    expressionInfo: 'Completa los espacios vacíos con precisión y creatividad. 🖼️',
    description:
      'Rellena áreas vacías en tus imágenes con la mejor calidad posible. Perfecto para completar fotos o eliminar áreas no deseadas.'
  },
  'object-remove': {
    label: 'Remover',
    route: '/transform/object-remove',
    Icon: PackageMinusIcon,
    shortTitle: 'Elimina objetos',
    expressionInfo: 'Deshazte de lo que no necesitas sin dejar rastro. 🧹',
    description:
      'Elimina objetos no deseados de tus imágenes de manera eficiente. Mantén solo lo importante y mejora la composición.'
  },
  recolor: {
    label: 'Coloración',
    route: '/transform/recolor',
    Icon: SprayCanIcon,
    shortTitle: 'Colorea tus Objetos',
    expressionInfo: '¡Porque en cada color hay una historia, y en cada imagen, una emoción.✨',
    description:
      'Transforma tu imagen al agregar colores vibrantes a los objetos que elijas. Dale vida a cada detalle y deja que tu creatividad ilumine cada rincón.'
  },
  'fill-remove': {
    label: 'Limpiar fondo',
    route: '/transform/fill-remove',
    Icon: ScanSearchIcon,
    shortTitle: 'Elimina el fondo',
    expressionInfo: 'Haz que el fondo de tus imágenes desaparezca sin esfuerzo. 🏞️',
    description:
      'Elimina el fondo de tus imágenes para enfocarte en los detalles importantes. Ideal para crear imágenes limpias y profesionales.'
  },
  'buy-credits': {
    label: 'Comprar Créditos',
    route: '/credits',
    Icon: BaggageClaimIcon,
    shortTitle: 'Adquiere Créditos',
    expressionInfo: 'Obtén créditos para acceder a todas nuestras herramientas premium. 💳',
    description:
      'Compra créditos para usar en nuestras herramientas y servicios avanzados. Mejora tu experiencia y obtén más de lo que necesitas.'
  }
}

export default dashboardLinks
