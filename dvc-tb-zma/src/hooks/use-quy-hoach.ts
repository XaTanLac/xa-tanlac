import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'
import { IArticle } from './use-news'

const useQuyHoachMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IArticle[], boolean, any] = (queryParams, deps) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/planning-construction-environments',
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

  const [quyHoachData, metaData] = useMemo<[IArticle[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [quyHoachData, loading, metaData]
}

const useQuyHoachDetailMemo: (id: string, queryParams: IUseCmsQuery, deps: any[]) => [IArticle | null, boolean] = (
  id,
  queryParams,
  deps,
) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/planning-construction-environments/${id}`,
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
        populate: queryParams.populate || '*',
      },
    },
    [id, ...deps],
  )

  const quyHoachDetailData = useMemo<IArticle | null>(() => {
    return !loading && data ? data : null
  }, [data, loading])

  return [quyHoachDetailData, loading]
}

export { useQuyHoachMemo, useQuyHoachDetailMemo }
