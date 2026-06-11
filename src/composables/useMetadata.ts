import { useFetch } from './useFetch'
import type { MetadataResponse } from '@/types/api'

export function useMetadata(): ReturnType<typeof useFetch<MetadataResponse>> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const apiKey = import.meta.env.VITE_API_KEY

  return useFetch<MetadataResponse>(() =>
    fetch(`${baseUrl}/metadata`, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch metadata')
      return res.json()
    })
  )
}
