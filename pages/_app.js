import Head from 'next/head'
import 'tailwindcss/tailwind.css'


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SafePostcode</title>
        <meta name="description" content="Is my postcode safe?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}