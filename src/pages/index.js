import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { parseISO, isBefore } from 'date-fns'
import { dehydrate } from 'react-query/hydration'
import { useMutation, queryCache, useQuery, QueryCache } from 'react-query'
import { Spinner } from '@/components/spinner'
import { TableLayout } from '@/components/table'
import { Dropdown } from '@/components/dropdown'
import { fetchFilms, fetchFilm } from '@/utils/queries'
import { RadioButton, RadioGroup } from '@/components/radio'
import { OpeningCrawl } from '@/components/opening-crawl'

export default function Home() {
  const [openingCrawl, setOpeningCrawl] = useState(null)
  const [gender, setGender] = useState('all')
  const { data: films } = useQuery('films', fetchFilms)
  const [mutate, { status, data: characters, error }] = useMutation(fetchFilm, {
    onSuccess(characters) {
      characters.map(({ data }) =>
        queryCache.setQueryData(['character', { url: data.url }], data, {
          staleTime: 1000 * 60 * 60,
          cacheTime: 1000 * 60 * 60
        })
      )
    },
    onMutate(characters) {
      characters.forEach((character) => {
        queryCache.cancelQueries(['character', { url: character }])

        const previousCharacter = queryCache.getQueryData(['character', { url: character }])

        queryCache.setQueryData(['character', { url: character }], previousCharacter)

        return () => queryCache.setQueryData(['character', { url: character }], previousCharacter)
      })
    },
    onError: (_, __, rollback) => rollback(),
    onSettled: (characters) => {
      characters.map(({ data }) => queryCache.invalidateQueries(['character', { url: data.url }]))
    }
  })

  function sorter(a, b) {
    return isBefore(parseISO(a), parseISO(b))
  }

  return (
    <div className="container mx-auto p-3">
      <Head>
        <title>Star Wars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-6">
        <h1 className="text-sw-yellow mx-auto block text-center text-5xl font-starjedi">
          Star Wars Films
        </h1>
        <Dropdown
          items={films.map((film) => film).sort(sorter)}
          onChange={(selection) => {
            if (selection) {
              mutate(selection.characters)
              setOpeningCrawl(selection.opening_crawl)
            }
          }}
        />

        {error && <div className="text-center text-red-500">{error}</div>}
        {status === 'idle' && (
          <img src="/logo.jpg" className="w-64 block mx-auto text-center" alt="star wars" />
        )}
        {status === 'loading' && <Spinner />}
        {status === 'success' && characters && (
          <div>
            <RadioGroup>
              <RadioButton
                value="all"
                id="all"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'all'}
                label="All"
              />
              <RadioButton
                value="male"
                id="male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'male'}
                label="Male"
              />
              <RadioButton
                value="female"
                id="female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'female'}
                label="Female"
              />
            </RadioGroup>
            <TableLayout
              columns={[
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
              ]}
              data={characters
                .map(({ data }) => ({
                  name: data.name,
                  gender: data.gender,
                  height: data.height
                }))
                .filter((character) =>
                  gender === 'all'
                    ? character
                    : gender === 'male'
                    ? character.gender === 'male'
                    : character.gender === 'female'
                )}
            />

            <OpeningCrawl openingCrawl={openingCrawl} />
          </div>
        )}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const queryCache = new QueryCache()

  await queryCache.prefetchQuery('films', fetchFilms)

  return {
    props: {
      dehydratedState: dehydrate(queryCache)
    }
  }
}
