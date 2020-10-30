import Head from 'next/head'
import { useQuery, useMutation } from 'react-query'
import { fetchFilms, fetchFilm } from '@/utils/queries'
import { Dropdown } from '@/components/dropdown'
import { parseISO, isBefore } from 'date-fns'
import { QueryCache } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { TableLayout } from '@/components/table'

export default function Home({ films }) {
  const [mutate, { status, data: characters, error }] = useMutation(fetchFilm)

  // const data = characters.map(({ data }) => ({
  //   name: data.name,
  //   gender: data.gender,
  //   height: data.height
  // }))

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      sortType: 'basic'
    },
    {
      Header: 'Gender',
      accessor: 'gender',
      sortType: 'basic'
    },
    {
      Header: 'Height',
      accessor: 'height',
      sortType: 'basic'
    }
  ]

  function sorter(a, b) {
    return isBefore(parseISO(a), parseISO(b))
  }

  return (
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
          items={films.sort(sorter)}
          onChange={(selection) => {
            if (selection) mutate(selection.characters)
          }}
        />
      </div>
      {characters !== undefined ? (
        <TableLayout
          columns={columns}
          data={characters.map(({ data }) => ({
            name: data.name,
            gender: data.gender,
            height: data.height
          }))}
        />
      ) : (
        <span>Loading...</span>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const queryCache = new QueryCache()

  await queryCache.prefetchQuery('films', fetchFilms)

  return {
    props: {
      films: dehydrate(queryCache).queries[0].data
    }
  }
}
