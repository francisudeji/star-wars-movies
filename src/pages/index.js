import Head from 'next/head'
import { useQuery } from 'react-query'
import { fetchFilms } from '@/utils/client'
import { Dropdown } from '@/components/dropdown'
import { ReactQueryConfigProvider } from 'react-query'
import { parseISO, isAfter } from 'date-fns'

export default function Home() {
  const { status, data, error } = useQuery('films', fetchFilms)

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  function sorter(a, b) {
    return isAfter(parseISO(a), parseISO(b))
  }

  return (
    <ReactQueryConfigProvider config={{ queries: { refetchOnWindowFocus: false } }}>
      <div className="container mx-auto p-3">
        <Head>
          <title>Star Wars App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="-mt-32">
          <h1 className="text-sw-yellow mx-auto block text-center text-5xl font-starjedi mb-6">
            Star Wars Movies
          </h1>
          <Dropdown
            items={data.sort(sorter)}
            onChange={(selection) => {
              console.log(selection)
            }}
          />
        </div>
      </div>
    </ReactQueryConfigProvider>
  )
}
