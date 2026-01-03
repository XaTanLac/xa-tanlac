import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'
import { IArticle } from './use-news'

const useFoodTravelMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IArticle[], boolean, any] = (
  queryParams,
  deps,
) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/food-travels',
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
        populate: queryParams.populate || '*',
      },
    },
    [...deps],
  )

  const [foodTravelData, metaData] = useMemo<[IArticle[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [foodTravelData, loading, metaData]
}

const useFoodTravelDetailMemo: (id: string, queryParams: IUseCmsQuery, deps: any[]) => [IArticle | null, boolean] = (
  id,
  queryParams,
  deps,
) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/food-travels/${id}`,
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
        populate: queryParams.populate || '*',
        sort: queryParams.sort || ['createdAt:desc'],
      },
    },
    [id, ...deps],
  )

  const foodTravelDetailData = useMemo<IArticle | null>(() => {
    return !loading && data ? data : null
  }, [data, loading])

  return [foodTravelDetailData, loading]
}

export { useFoodTravelMemo, useFoodTravelDetailMemo }
