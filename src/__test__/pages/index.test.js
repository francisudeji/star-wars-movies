import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import Home from '../../pages/index'

jest.setTimeout(10000)
const queryCache = new QueryCache()
queryCache.setQueryData('films', [])

export const props = {
  Component: Home,
  pageProps: {
    dehydratedState: {}
  }
}

export function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={props.dehydratedState}>
        <props.Component {...props} films={[]} />
      </Hydrate>
    </ReactQueryCacheProvider>
  )
}

describe('Home page', () => {
  test('Renders no films by default', async () => {
    const utils = render(<App {...props} />)

    userEvent.type(utils.getByRole(/search/i), 'The Empire Strikes Back')
    expect(utils.getByRole(/search/i)).toHaveValue('The Empire Strikes Back')
    expect(utils.getByRole(/listbox/i)).not.toContainHTML('<li role="option"></li>')
  })

  test('Can select a single film from the dropdown and reset the input', async () => {
    queryCache.setQueryData('films', [
      {
        title: 'The Empire Strikes Back',
        release_date: '2000-04-10',
        characters: ['http://swapi.dev/api/people/1']
      },
      {
        title: 'Return of the Jedi',
        release_date: '2005-04-10',
        characters: ['http://swapi.dev/api/people/1', 'http://swapi.dev/api/people/2']
      }
    ])
    const utils = render(<App {...props} />)

    userEvent.type(utils.getByRole(/search/i), 'The Empire')
    expect(utils.getByRole(/search/i)).toHaveValue('The Empire')
    expect(utils.getByRole(/listbox/i)).toContainElement(utils.getByRole('option'))
    expect(utils.getByRole(/listbox/i)).toContainElement(
      utils.getByText(/The Empire Strikes Back/i)
    )
    expect(utils.getByRole(/listbox/i)).toContainElement(utils.getByText(/2000 film/i))

    userEvent.click(utils.getByRole(/option/i))
    expect(utils.getByRole(/search/i)).toHaveValue('The Empire Strikes Back')

    userEvent.click(utils.getByLabelText(/clear selection/i))
    expect(utils.getByRole(/search/i)).toHaveValue('')
  })

  test('Should render the loading spinner when a selection is made', async () => {
    queryCache.setQueryData('films', [
      {
        title: 'The Return of the Jedi',
        release_date: '2010-04-10',
        characters: ['http://swapi.dev/api/people/3']
      }
    ])

    const utils = render(<App {...props} />)

    userEvent.type(utils.getByRole(/search/i), 'The Return')

    expect(utils.getByRole(/search/i)).toHaveValue('The Return')
    expect(utils.getByRole(/listbox/i)).toContainElement(utils.getByRole('option'))
    expect(utils.getByRole(/listbox/i)).toContainElement(utils.getByText(/The Return of the Jedi/i))
    expect(utils.getByRole(/listbox/i)).toContainElement(utils.getByText(/2010 film/i))

    userEvent.click(utils.getByRole(/option/i))
    expect(utils.getByLabelText('spinner')).toBeInTheDocument()
  })
})
