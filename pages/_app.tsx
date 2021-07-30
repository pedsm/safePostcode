import { AppProps } from 'next/dist/next-server/lib/router/router'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { ReactElement } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'


export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <title>Safe Postcode</title>
        <meta name="description" content="Is my postcode safe?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/ico" href="/favicon.ico"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"></link>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}