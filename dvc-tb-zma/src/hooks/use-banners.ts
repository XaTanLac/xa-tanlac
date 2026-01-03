import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'
import useCms, { IUseCmsQuery } from './use-cms'

export interface IBannerImage {
  alternativeText: string
  hash: string
  id: number
  name: string
  url: string
  documentId: string
}

const useBannersMemo = (queryParams: IUseCmsQuery, deps: []): IBannerImage[] => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/banners',
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
        populate: queryParams.populate || '*',
        sort: queryParams.sort || ['createdAt:desc'],
      },
    },
    [...deps],
  )

  return useMemo<IBannerImage[]>(() => {
    return !loading && data?.[0].images ? data?.[0].images : []
  }, [data, loading])
}

export default useBannersMemo
