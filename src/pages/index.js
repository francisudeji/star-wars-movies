import React, { useState, useCallback } from 'react'
import Head from 'next/head'
import { parseISO, isBefore } from 'date-fns'
import { dehydrate } from 'react-query/hydration'
import { useQuery, QueryCache } from 'react-query'
import { Spinner } from '../components/spinner'
import { TableLayout } from '../components/table'
import { Dropdown } from '../components/dropdown'
import { fetchFilms } from '../utils/queries'
import { RadioButton, RadioGroup } from '../components/radio'
import { OpeningCrawl } from '../components/opening-crawl'
import { useCharactersMutation } from '../utils/hooks'

export default function Home() {
  const [_gender, setGender] = useState('all')
  const [openingCrawl, setOpeningCrawl] = useState(null)

  const { data: films } = useQuery('films', fetchFilms)
  const { mutate, status, characters, error } = useCharactersMutation()

  const sorter = useCallback((a, b) => {
    return isBefore(parseISO(a), parseISO(b))
  })

  return (
    <div className="container mx-auto p-3">
      <Head>
        <title>Star Wars</title>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
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

        {error && <div className="text-center text-red-500">{error.message}</div>}
        {status === 'idle' && (
          <img src="/logo.jpg" className="w-64 block mx-auto text-center" alt="star wars" />
        )}
        {status === 'loading' && <Spinner />}
        {status === 'success' && characters && (
          <div data-testid="wrapper">
            <RadioGroup>
              <RadioButton
                value="all"
                id="all"
                onChange={(e) => setGender(e.target.value)}
                checked={_gender === 'all'}
                label="All"
              />
              <RadioButton
                value="male"
                id="male"
                onChange={(e) => setGender(e.target.value)}
                checked={_gender === 'male'}
                label="Male"
              />
              <RadioButton
                value="female"
                id="female"
                onChange={(e) => setGender(e.target.value)}
                checked={_gender === 'female'}
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
                .map(({ data: { name, gender, height } }) => ({
                  name,
                  gender,
                  height
                }))
                .filter((character) =>
                  _gender === 'all'
                    ? character
                    : _gender === 'male'
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
