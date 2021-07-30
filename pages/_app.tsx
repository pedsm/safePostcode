import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { ReactElement } from 'react'
import 'tailwindcss/tailwind.css'


export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head>
        <title>Safe Postcode</title>
        <meta name="description" content="Is my postcode safe?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/ico" href="/favicon.ico"></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}