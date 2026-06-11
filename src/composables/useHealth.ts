import { useFetch } from './useFetch'
import type { HealthResponse } from '@/types/api'

export function useHealth(): ReturnType<typeof useFetch<HealthResponse>> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const apiKey = import.meta.env.VITE_API_KEY

  return useFetch<HealthResponse>(() =>
    fetch(`${baseUrl}/health`, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) throw new Error('Health check failed')
      return res.json()
    })
  )
}
