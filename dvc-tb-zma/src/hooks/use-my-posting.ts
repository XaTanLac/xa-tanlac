import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'
import { IArticle, MediaModel } from './use-news'

const useMyPostingMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IArticle[], boolean, any] = (
  queryParams,
  deps,
) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/my-postings',
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

  const [myPostingData, metaData] = useMemo<[IArticle[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [myPostingData, loading, metaData]
}

const useMyPostingDetailMemo: (id: string, queryParams: IUseCmsQuery, deps: any[]) => [IArticle | null, boolean] = (
  id,
  queryParams,
  deps,
) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/my-postings/${id}`,
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

  const myPostingDetailData = useMemo<IArticle | null>(() => {
    return !loading && data ? data : null
  }, [data, loading])

  return [myPostingDetailData, loading]
}

export interface IImagePosting {
  title: string
  documentId: string
  img: MediaModel
  createdAt: string
}

const useMyImagePostingMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IImagePosting[], boolean, any] = (
  queryParams,
  deps,
) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/my-image-postings',
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

  const [myImagePostingData, metaData] = useMemo<[IImagePosting[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [myImagePostingData, loading, metaData]
}

const useMyImagePostingDetailMemo: (
  id: string,
  queryParams: IUseCmsQuery,
  deps: any[],
) => [IImagePosting | null, boolean] = (id, queryParams, deps) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/my-image-postings/${id}`,
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

  const myImagePostingDetailData = useMemo<IImagePosting | null>(() => {
    return !loading && data ? data : null
  }, [data, loading])

  return [myImagePostingDetailData, loading]
}

export interface IAudioPosting {
  title: string
  documentId: string
  audio?: MediaModel
  linkVideo?: string
  createdAt: string
}

const useMyAudioPostingMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IAudioPosting[], boolean, any] = (
  queryParams,
  deps,
) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/my-audio-postings',
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

  const [myAudioPostingData, metaData] = useMemo<[IAudioPosting[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [myAudioPostingData, loading, metaData]
}

const useMyAudioPostingDetailMemo: (
  id: string,
  queryParams: IUseCmsQuery,
  deps: any[],
) => [IAudioPosting | null, boolean] = (id, queryParams, deps) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/my-audio-postings/${id}`,
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

  const myAudioPostingDetailData = useMemo<IAudioPosting | null>(() => {
    return !loading && data ? data : null
  }, [data, loading])

  return [myAudioPostingDetailData, loading]
}

export {
  useMyPostingMemo,
  useMyPostingDetailMemo,
  useMyImagePostingMemo,
  useMyAudioPostingMemo,
  useMyAudioPostingDetailMemo,
  useMyImagePostingDetailMemo,
}
