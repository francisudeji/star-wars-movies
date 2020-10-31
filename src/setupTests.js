import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { configure, cleanup } from '@testing-library/react'
import { queryCache } from 'react-query'

// speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configure({ defaultHidden: true })

// general cleanup
afterEach(async () => {
  queryCache.clear()
  cleanup()
})
