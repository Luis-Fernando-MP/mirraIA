import { UserButton } from '@clerk/nextjs'
import {
  BaggageClaimIcon,
  BookImageIcon,
  HouseIcon,
  MicroscopeIcon,
  PackageMinusIcon,
  ScanSearchIcon,
  SprayCanIcon
} from 'lucide-react'

export const navLinks = [
  {
    label: 'Inicio',
    route: '/',
    Icon: HouseIcon
  },
  {
    label: 'Restaurar',
    route: '/transform/restore',
    Icon: MicroscopeIcon
  },
  {
    label: 'Aumentar relleno',
    route: '/transform/max-fill',
    Icon: BookImageIcon
  },
  {
    label: 'Remover',
    route: '/transform/object-remove',
    Icon: PackageMinusIcon
  },
  {
    label: 'Coloración',
    route: '/transform/recolor',
    Icon: SprayCanIcon
  },
  {
    label: 'Limpiar fondo',
    route: '/transform/fill-remove',
    Icon: ScanSearchIcon
  },
  {
    label: 'Comprar Créditos',
    route: '/credits',
    Icon: BaggageClaimIcon
  },
  {
    label: 'Perfil',
    route: '/profile',
    Icon: UserButton
  }
]
