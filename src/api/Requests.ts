import axios, { CancelToken } from 'axios'
import { useCallback, useState } from 'react'
import { Character, CharactersResponse } from '../types/Types'
import { axiosInstance } from './AxiosConfig'

export type FilterCharacters = {
  name?: string
}

const filterCharacters = (filterOptions?: FilterCharacters) => {
  if (!filterOptions) return ''
  const filterParts: string[] = []
  if (filterOptions.name) filterParts.push(`name=${filterOptions.name}`)

  return `?${filterParts.join('&')}`
}

export const useFetchCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [nextURL, setNextURL] = useState<string | undefined>(undefined)

  const fetch = useCallback(
    async (url: string, cancelToken: CancelToken, prev?: Character[]) => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get<CharactersResponse>(url, {
          cancelToken,
        })
        if (response.status === 200) {
          setCharacters([...(prev || []), ...response.data.results])
          setNextURL(response.data.info.next || undefined)
          setIsLoading(false)
          return
        } else {
          setCharacters([])
          setIsLoading(false)
          throw new Error('Failed to fetch characters')
        }
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('Data fetching cancelled inside fetch')
        } else {
          setCharacters([])
          if (e instanceof Error) console.log(`ERROR: ${e.name} ${e.message}`)
        }
        setIsLoading(false)
      }
    },
    [],
  )

  const fetchCharacters = useCallback(
    (filterOptions?: FilterCharacters) => {
      setCharacters([])
      const url = `/character/${filterCharacters(filterOptions)}`
      const source = axios.CancelToken.source()
      void fetch(url, source.token)
      return () => source.cancel('Data fetching cancelled due to unmount')
    },
    [fetch],
  )

  const fetchMoreCharacters = useCallback(() => {
    if (!nextURL) return

    const source = axios.CancelToken.source()
    void fetch(nextURL, source.token, characters)
    return () => source.cancel('Data fetching cancelled due to unmount')
  }, [fetch, nextURL, characters])

  return { characters, isLoading, fetchMoreCharacters, fetchCharacters }
}
