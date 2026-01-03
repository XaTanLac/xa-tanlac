import { useEffect, useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'

export interface INumberOfVisits {
  documentId: string
  device: string
  timeVisit: string
}

export interface BNumberOfVisits {
  device: string
  timeVisit: string
}

const useVisitorMemo = (endpoint: string, queryParams: IUseCmsQuery, deps: any[]): [number, boolean] => {
  const { data, meta, loading, refetch } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: endpoint,
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
      },
    },
    [...deps],
  )

  const [numberVisitor] = useMemo<[number]>(() => {
    return !loading && data ? [meta.pagination.total] : [0]
  }, [data, loading, meta])

  useEffect(() => {
    const timer = setInterval(
      () => {
        refetch?.()
      },
      10 * 60 * 1000,
    ) // 10 minutes

    return () => clearInterval(timer)
  }, [refetch])

  return [numberVisitor, loading]
}

export default useVisitorMemo
