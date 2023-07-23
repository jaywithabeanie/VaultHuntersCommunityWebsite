import type { AppProps } from 'next/app'
import RootLayout from './layout'
import './globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
    return <RootLayout><Component {...pageProps} /></RootLayout>
}