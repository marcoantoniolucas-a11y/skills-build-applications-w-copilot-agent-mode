import { useEffect, useState } from 'react'
import { API_BASE_URL, getCollection } from '../lib/api.js'

export default function useApiCollection(endpoint) {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Unable to load data (${response.status} ${response.statusText}).`)
        }

        setRecords(getCollection(await response.json()))
      } catch (requestError) {
        if (requestError?.name !== 'AbortError') {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'An unexpected error occurred while loading data.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint])

  return { records, isLoading, error }
}
