import { SignInButton } from '@clerk/nextjs'
import type { JSX } from 'react'

const Landing = (): JSX.Element => {
  return (
    <main>
      <SignInButton />
      <div>Landing</div>
    </main>
  )
}

export default Landing
