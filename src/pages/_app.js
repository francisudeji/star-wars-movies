import '@/css/tailwind.css'
import Head from 'next/head'
import { ReactQueryConfigProvider } from 'react-query'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false
  }
}
export default function App({ Component, pageProps }) {
  return (
    <div className="antialiased text-gray-900">
      <Head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#FFE81F" />
      </Head>

      <main>
        <ReactQueryConfigProvider config={{ queryConfig }}>
          <Component {...pageProps} />
        </ReactQueryConfigProvider>
      </main>
    </div>
  )
}
