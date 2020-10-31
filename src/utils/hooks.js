import { useMutation, queryCache } from 'react-query'
import { fetchFilmCharacters } from './queries'

export function useCharactersMutation() {
  const [mutate, { status, data: characters, error }] = useMutation(fetchFilmCharacters, {
    onSuccess(response, characters) {
      const data = response.map(({ data }) => data)
      queryCache.setQueryData(['characters', characters], data, {
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60
      })
    },
    onMutate(characters) {
      queryCache.cancelQueries(['characters', characters])

      const previousCharacters = queryCache.getQueryData(['characters', characters])

      queryCache.setQueryData(['characters', characters], previousCharacters)

      return () => previousCharacters
    },
    onError(error, _, rollback) {
      if (error) {
        rollback()
      }
    }
  })

  return { mutate, status, characters, error }
}
