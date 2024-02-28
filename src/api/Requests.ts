import { isNilOrEmpty } from 'ramda-adjunct'
import { Character, CharactersResponse } from '../types/Types'
import { axiosInstance } from './AxiosConfig'

export type CharactersFilter = {
  name?: string
}

export const fetchCharacters = async (
  page: number | null = null,
  filterOptions?: CharactersFilter,
) => {
  const params = new URLSearchParams()
  if (page) params.append('page', page.toString())
  if (filterOptions?.name) params.append('name', filterOptions.name)

  const res = await axiosInstance.get<CharactersResponse>('/character', {
    params: {
      page: page,
      name: filterOptions?.name,
    },
  })

  const nextPage = new URL(res.data.info.next).searchParams.get('page')

  return {
    data: res.data.results,
    nextPage: nextPage ? Number(nextPage) : null,
  }
}

export const fetchCharacter = async (characterUrl: string) => {
  if (isNilOrEmpty(characterUrl)) throw new Error('Character URL is empty')
  const res = await axiosInstance.get<Character>(characterUrl)

  if (res.status !== 200) {
    throw new Error('Network response was not ok')
  }
  return res.data
}
