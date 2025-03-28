import { AxiosError } from 'axios'

export const CatchAxiosError = (err: any) => {
  if (err instanceof AxiosError) {
    throw new Error(
      err.response?.data.message || 'An unexpected error occurred',
    )
  }
  console.log(err)
  throw new Error('An unexpected error occurred')
}
