import axios, { CancelToken } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Character, CharactersResponse } from '../types/Types'
import { axiosInstance } from './AxiosConfig'

export const useFetchCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [nextURL, setNextURL] = useState<string | undefined>(undefined)

  const fetchCharacters = useCallback(
    async (cancelToken: CancelToken) => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get<CharactersResponse>(
          nextURL ? nextURL : '/character/',
          { cancelToken },
        )
        if (response.status === 200) {
          setCharacters([...characters, ...response.data.results])
          setNextURL(response.data.info.next || undefined)
          setIsLoading(false)
          return
        } else {
          throw new Error('Failed to fetch users')
        }
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('Data fetching cancelled inside fetch')
        } else {
          if (e instanceof Error) console.log(`ERROR: ${e.name} ${e.message}`)
        }
        setIsLoading(false)
      }
    },
    [characters, nextURL],
  )

  const fetchMoreCharacters = useCallback(() => {
    console.log('fetchMoreCharacters')

    const source = axios.CancelToken.source()
    void fetchCharacters(source.token)
    return () => source.cancel('Data fetching cancelled due to unmount')
  }, [fetchCharacters])

  useEffect(() => {
    console.log('Init fetch')

    const source = axios.CancelToken.source()
    void fetchCharacters(source.token)
    return () => source.cancel('Data fetching cancelled due to unmount')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { characters, isLoading, fetchMoreCharacters }
}
