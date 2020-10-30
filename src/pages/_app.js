import '@/css/tailwind.css'
import Head from 'next/head'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query-devtools'

const queryCache = new QueryCache()

export default function App({ Component, pageProps }) {
  return (
    <div className="antialiased text-gray-900 min-h-screen">
      <Head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#FFE81F" />
      </Head>

      <main className="h-full min-h-screen py-32 bg-black flex items-center justify-center">
        <ReactQueryDevtools initialIsOpen />
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </ReactQueryCacheProvider>
      </main>
    </div>
  )
}
