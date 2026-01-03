import { useState, useEffect, useCallback } from 'react'
import qs from 'qs'

interface IUseCmsOptions {
  host: string
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}

export interface IUseCmsQuery {
  sort?: unknown[]
  filters?: unknown
  populate?: unknown
  fields?: unknown[]
  pagination?: {
    pageSize?: number
    page?: number
    start?: number
    limit?: number
    withCount?: boolean
  }
  status?: string
  locale?: string
  [key: string]: any
}

interface IUseCmsObject {
  options: IUseCmsOptions
  queryParams?: IUseCmsQuery | object
  headers?: HeadersInit
  body?: unknown
  delay?: number
}

interface IUseCmsReturn {
  data: any
  meta: any
  loading: boolean
  error: string | null
  refetch?: () => Promise<void>
}

type useCmsType = (config: IUseCmsObject, deps: any[]) => IUseCmsReturn

const useCms: useCmsType = ({ options, queryParams = {}, headers = {}, body = null, delay = 0 }, deps) => {
  const [data, setData] = useState(null)
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    const queryString = qs.stringify(queryParams, { addQueryPrefix: true, arrayFormat: 'brackets' })
    const urlcomp = [options.host, options.endpoint, `${queryString ?? ''}`]
    const url = urlcomp.join('')

    try {
      const res = await fetch(url, { method: options.method, headers, body: body ? JSON.stringify(body) : undefined })

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
      }

      const responseData = await res.json()
      setData(responseData.data)
      setMeta(responseData.meta)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [...deps])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, delay)
    return () => clearTimeout(timer)
  }, [fetchData, delay])

  return { data, meta, loading, error, refetch: fetchData }
}

export default useCms
