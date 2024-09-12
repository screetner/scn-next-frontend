interface FetchError extends Error {
  status?: number
  info?: any
}

export default async function CustomFetch<T>(
  url: string,
  method: string,
  body?: Object,
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const error: FetchError = new Error(
      'An error occurred while fetching the data.',
    )
    error.status = response.status
    error.info = await response.json()
    throw error
  }

  return response.json()
}
