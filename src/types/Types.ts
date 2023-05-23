export interface ErrorResponse {
  error: string
}

export interface CharactersResponse {
  info: CharactersInfo
  results: Character[]
}

export interface CharactersInfo {
  count: number
  pages: number
  next: string
  prev?: string
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: OriginOrLocation
  location: OriginOrLocation
  image: string
  episode?: string[] | null
  url: string
  created: string
}

export interface OriginOrLocation {
  name: string
  url: string
}
