import { ErrorResponse } from '../types/Types'

export const isErrorResponse = (
  response: unknown,
): response is ErrorResponse => {
  if (response !== null && typeof response === 'object') {
    return 'error' in response
  }
  return false
}
