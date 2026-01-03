import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'

export interface IArticle {
  documentId: string
  title: string
  content: string
  isTopNews: boolean
  createdAt: string
  imgBanner?: MediaModel
}

export interface MediaModel {
  id: number
  documentId: string
  name: string
  url: string
  ext?: string
  width?: number
  height?: number
}

const useNewsMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IArticle[], boolean, any] = (queryParams, deps) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/articles',
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

  const [newsData, metaData] = useMemo<[IArticle[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [newsData, loading, metaData]
}

const useNewsDetailMemo: (id: string, queryParams: IUseCmsQuery, deps: any[]) => [IArticle | null, boolean] = (
  id,
  queryParams,
  deps,
) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/articles/${id}`,
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

  const newsDetailData = useMemo<IArticle | null>(() => {
    return !loading && data ? data : null
  }, [data, loading])

  return [newsDetailData, loading]
}

export { useNewsMemo, useNewsDetailMemo }
