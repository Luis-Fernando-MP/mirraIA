import { ClerkProvider } from '@clerk/nextjs'
import { type JSX, type ReactNode } from 'react'

interface IProviders {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Providers = ({ children }: IProviders): JSX.Element => {
  return <ClerkProvider>{children}</ClerkProvider>
}

export default Providers
