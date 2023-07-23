import Header from '@/components/header'
import { Boogaloo, Lato, Permanent_Marker } from 'next/font/google'
import classNames from 'classnames'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Footer from '@/components/footer'
import s from './layout.module.scss'
import Head from 'next/head'
config.autoAddCss = false

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '300', '700'],
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
    <>
      <Head>
        <title>Vault Hunters Community Guide</title>
      </Head>
      <div className={classNames(lato.variable, boogaloo.variable, marker.variable, s.container)}>
        <Header />
        <div className={s.content}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}
