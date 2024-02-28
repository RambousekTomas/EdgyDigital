import axios, { CancelTokenSource } from 'axios'

export const RICK_AND_MORTY_API_URI = 'https://rickandmortyapi.com/api'

export const axiosInstance = axios.create({
  baseURL: RICK_AND_MORTY_API_URI,
})

let cancelTokenSource: CancelTokenSource | undefined = undefined

axiosInstance.interceptors.request.use((config) => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Operation canceled due to new request.')
  }

  cancelTokenSource = axios.CancelToken.source()
  config.cancelToken = cancelTokenSource.token

  return config
})
