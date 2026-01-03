import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'
import { IArticle } from './use-news'
import { IBannerImage } from './use-banners'

export interface IPublicInfo extends Omit<IArticle, 'imgBanner' | 'isTopNews'> {
  listFiles: IBannerImage[]
}

const usePublicInfoMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IPublicInfo[], boolean, any] = (
  queryParams,
  deps,
) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/public-infos',
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

  const [publicInfoData, metaData] = useMemo<[IPublicInfo[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [publicInfoData, loading, metaData]
}

const usePublicInfoDetailMemo: (id: string, queryParams: IUseCmsQuery, deps: any[]) => [IPublicInfo | null, boolean] = (
  id,
  queryParams,
  deps,
) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/public-infos/${id}`,
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

  const publicInfoDetailData = useMemo<IPublicInfo | null>(() => {
    return !loading && data ? data : null
  }, [data, loading])

  return [publicInfoDetailData, loading]
}

export { usePublicInfoMemo, usePublicInfoDetailMemo }
