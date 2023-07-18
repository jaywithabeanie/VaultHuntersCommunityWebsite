import Header from '@/components/header'
import './globals.css'
import type { Metadata } from 'next'
import { Boogaloo, Lato, Permanent_Marker } from 'next/font/google'
import classNames from 'classnames'


export const metadata: Metadata = {
  title: 'Vault Hunters Community Guide',
  description: '',
}

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '300', '900'],
  variable: '--font-main',
})
const boogaloo = Boogaloo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-secondary',
})

const marker = Permanent_Marker({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-title',
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={classNames(lato.variable, boogaloo.variable, marker.variable)}>
        <Header />
        {children}
      </body>
    </html>
  )
}
