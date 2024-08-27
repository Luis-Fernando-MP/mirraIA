import { Montserrat, Playfair_Display, Roboto } from 'next/font/google'

export const MontserratFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700', '800', '900'],
  variable: '--MontserratFont'
})

export const RobotoFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--RobotoFont'
})

export const PlayFairFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--PlayFairFont'
})
