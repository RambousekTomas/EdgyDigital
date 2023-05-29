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
  const [isFetching, setIsFetching] = useState(false)
  const [nextURL, setNextURL] = useState<string | undefined>(undefined)

  const fetch = useCallback(
    async (url: string, cancelToken: CancelToken, prev?: Character[]) => {
      try {
        setIsFetching(true)
        const response = await axiosInstance.get<CharactersResponse>(url, {
          cancelToken,
        })
        if (response.status === 200) {
          setCharacters([...(prev || []), ...response.data.results])
          setNextURL(response.data.info.next || undefined)
          setIsFetching(false)
          return
        } else {
          setCharacters([])
          setIsFetching(false)
          throw new Error('Failed to fetch characters')
        }
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('Data fetching cancelled inside fetch')
        } else {
          setCharacters([])
          if (e instanceof Error) console.log(`ERROR: ${e.name} ${e.message}`)
        }
        setIsFetching(false)
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

  return {
    characters,
    isLoading: isFetching,
    fetchMoreCharacters,
    fetchCharacters,
  }
}

export const useFetchCharacter = () => {
  const [character, setCharacter] = useState<Character>()
  const [isFetching, setIsFetching] = useState(false)

  const fetch = useCallback(async (url: string, cancelToken: CancelToken) => {
    try {
      setIsFetching(true)
      const response = await axiosInstance.get<Character>(url, {
        cancelToken,
      })
      if (response.status === 200) {
        setCharacter(response.data)
        setIsFetching(false)
        return
      } else {
        setCharacter(undefined)
        setIsFetching(false)
        throw new Error('Failed to fetch characters')
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Data fetching cancelled inside fetch')
      } else {
        setCharacter(undefined)
        if (e instanceof Error) console.log(`ERROR: ${e.name} ${e.message}`)
      }
      setIsFetching(false)
    }
  }, [])

  const fetchCharacter = useCallback(
    (url: string) => {
      setCharacter(undefined)
      const source = axios.CancelToken.source()
      void fetch(url, source.token)
      return () => source.cancel('Data fetching cancelled due to unmount')
    },
    [fetch],
  )

  return { character, isFetching, fetchCharacter }
}
