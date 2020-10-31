import React from 'react'
import { render } from '@testing-library/react'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import Home from '../../pages/index'

const queryCache = new QueryCache()
queryCache.setQueryData('films', [])

export const props = {
  Component: Home,
  pageProps: {
    dehydratedState: {}
  }
}

function Component() {
  return (
    <div>
      <h1>Star Wars Films</h1>
      <input type="text" role="search" />
    </div>
  )
}

export function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={props.dehydratedState}>
        <Component {...props} films={[]} />
      </Hydrate>
    </ReactQueryCacheProvider>
  )
}

test('Home page renders without errors', () => {
  const utils = render(<App {...props} />)

  expect(App).toMatchSnapshot()
  expect(utils.getByText(/star wars films/i)).toBeInTheDocument()
  expect(utils.getByRole(/search/i)).toBeInTheDocument()
})
