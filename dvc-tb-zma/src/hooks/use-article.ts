import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import { IBannerImage } from './use-banners'
import useCms, { IUseCmsQuery } from './use-cms'

export interface IArticle {
  documentId: string
  title: string
  content: string
  isTopNews: boolean
  createdAt: string
  imgBanner?: MediaModel
  description?: string
  body?: any[]
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

export interface IImagePosting {
  title: string
  documentId: string
  img: MediaModel
  createdAt: string
}

export interface IAudioPosting {
  title: string
  documentId: string
  audio?: MediaModel
  linkVideo?: string
  createdAt: string
}

export interface IPublicInfo extends Omit<IArticle, 'imgBanner' | 'isTopNews'> {
  listFiles: IBannerImage[]
}

const useArticleMemo = <T>(endpoint: string, queryParams: IUseCmsQuery, deps: any[]): [T, boolean, any] => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: endpoint,
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

  const [articleData, metaData] = useMemo<[T, any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [articleData, loading, metaData]
}

const useArticleDetailMemo = <T>(
  endpoint: string,
  queryParams: IUseCmsQuery,
  deps: any[],
): [T | undefined, boolean] => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: endpoint,
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

  const articleDetailData = useMemo<T | undefined>(() => {
    return !loading && data ? data : undefined
  }, [data, loading])

  return [articleDetailData, loading]
}

export { useArticleMemo, useArticleDetailMemo }
