import axios from 'axios'

export const RICK_AND_MORTY_API_URI = 'https://rickandmortyapi.com/api'

export const axiosInstance = axios.create({
  baseURL: RICK_AND_MORTY_API_URI,
})
